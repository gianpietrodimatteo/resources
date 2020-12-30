import { Injectable } from '@nestjs/common';
import { CryptographyService } from 'src/cryptography/cryptography.service';
import { CostElementService } from 'src/entity/cost-element/service/cost-element.service';
import { CostElementDto } from '../../../entity/cost-element/domain/cost-element.dto';
import { CostElement } from '../../../entity/cost-element/domain/cost-element.schema';
import { DashboardLogger } from '../../../logger/dashboard-logger.service';
import { CostElementOperation } from './cost-element-operation';


@Injectable()
export class CostElementOperationService {

    constructor(
        private readonly service: CostElementService,
        private readonly cService: CryptographyService,
        private readonly logger: DashboardLogger
    ) {
        this.logger.setContext('CostElementOperationService');
    }

    async apply(operation: CostElementOperation): Promise<CostElement> {
        this.logger.log('Applying operation' + JSON.stringify(operation));

        const searchResult = await (this.service.find({ name: `${operation.name}`, symbol: `${operation.symbol}` }));

        if (searchResult.length === 0) {
            return this.service.create(new CostElementDto(operation));
        } else {
            return this.service.update(searchResult[0]._id, this.applyOperationAndReturnDto(operation, searchResult[0]));
        }
    }

    private applyOperationAndReturnDto(operation: CostElementOperation, entity: CostElement): CostElementDto {
        const entityDto = new CostElementDto(entity);
        entityDto.totalBudget = this.cService.add(entityDto.totalBudget, operation.totalBudget);
        return entityDto;
    }

}
