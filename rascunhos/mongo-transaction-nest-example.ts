import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptographyService } from 'src/cryptography/cryptography.service';
import { CostElementDto } from 'src/entity/cost-element/domain/cost-element.dto';
import { CostElementService } from 'src/entity/cost-element/service/cost-element.service';
import { CostElement } from '../../../../entity/cost-element/domain/cost-element.schema';
import { DashboardLogger } from '../../../../logger/dashboard-logger.service';
import { CostElementOperation } from '../domain/cost-element-operation';
import { CostElementOperationDto } from '../domain/cost-element-operation.dto';


@Injectable()
export class CostElementOperationService {
    constructor(
        @InjectModel(CostElement.name) private readonly costElementModel: Model<CostElement>,
        @InjectModel(CostElementOperation.name) private readonly costElementOperationModel: Model<CostElementOperation>,
        private readonly costElementService: CostElementService,
        private readonly cryptographyService: CryptographyService,
        private readonly logger: DashboardLogger
    ) {
        this.logger.setContext('CostElementOperationService');
    }

    async createAndApply(operationDto: CostElementOperationDto): Promise<CostElementOperationDto> {
        this.logger.debug('Creating and applying cost element operation');
        try {

            const session = await this.costElementOperationModel.db.startSession();
            session.startTransaction();
            try {
                this.logger.log('Creating new cost element operation ' + operationDto.name + operationDto.budgetChange);

                const createdCostElementOperation = new this.costElementOperationModel(operationDto);
                const operationEntity = await createdCostElementOperation.save({ session });

                this.logger.log('Applying cost element operation ' + operationDto.name + ' ' + operationDto.budgetChange);

                const searchResult = await (this.costElementService.find({ name: `${operationDto.name}` }));

                // Se não já existir, cria
                await this.costElementModel.findOneAndUpdate(
                    { name: `${operationDto.name}` }, this.applyOperationAndReturnEntity(operationDto, searchResult[0]), { upsert: true, new: true })
                    .session(session).exec();

                await session.commitTransaction();
                this.logger.log(`Operation '${operationDto.name}' created and applied`);

                return new CostElementOperationDto(operationEntity);
            } catch (error) {
                await session.abortTransaction();
                this.logger.error(`Error creating or applying operation '${operationDto.name}'. Aborting.`);
                session.endSession();
                throw error;
            }
            finally {
                session.endSession();
            }
        } catch (error) {
            this.logger.error('Couldn\'t create transaction.');
            throw error;
        }
    }

    async createAndApplyOriginal(costElementOperationDto: CostElementOperationDto): Promise<CostElementOperationDto> {
        this.logger.debug('Creating and applying cost element operation');
        const creation = await this.create(costElementOperationDto);
        await this.apply(costElementOperationDto);
        return creation;
    }

    async create(costElementOperationDto: CostElementOperationDto): Promise<CostElementOperationDto> {
        this.logger.log('Creating new cost element operation ' + costElementOperationDto.name + costElementOperationDto.budgetChange);

        const createdOperation = new this.costElementOperationModel(costElementOperationDto);
        return new CostElementOperationDto(createdOperation.save());
    }

    async apply(costElementOperationDto: CostElementOperationDto): Promise<CostElementDto> {
        this.logger.log('Applying cost element operation ' + costElementOperationDto.name + costElementOperationDto.budgetChange);
        const costElement = await (this.costElementService.find({ name: `${costElementOperationDto.name}` }));
        if (costElement === null || costElement[0].name === null) {
            return this.costElementService.create(this.applyOperationAndReturnEntity(costElementOperationDto, new CostElementDto()));
        } else {
            return this.costElementService.update(
                costElement[0]._id,
                this.applyOperationAndReturnEntity(costElementOperationDto, costElement[0])
            );
        }
    }

    async findAll(): Promise<CostElementOperationDto[]> {
        this.logger.log('Fetching all cost element operations');
        const costElementOperationDtos: CostElementOperationDto[] = [];
        (await this.costElementOperationModel.find().exec()).forEach(costElementOperation =>
            costElementOperationDtos.push(new CostElementOperationDto(costElementOperation)));
        return costElementOperationDtos;
    }

    private applyOperationAndReturnEntity(operation: CostElementOperationDto, costElementDto: CostElementDto): CostElementDto {
        if (costElementDto === null) {
            return new CostElementDto({
                name: `${operation.name}`,
                budget: `${operation.budgetChange}`
            })
        } else {
            costElementDto.name = operation.name;

            let budget = Number(this.cryptographyService.decrypt(costElementDto.totalBudget));
            const budgetChange = Number(this.cryptographyService.decrypt(operation.budgetChange));

            budget += budgetChange;

            costElementDto.totalBudget = this.cryptographyService.encrypt(budget.toString());
            return costElementDto;
        }
    }

}
