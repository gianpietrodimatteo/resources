import { Injectable } from '@nestjs/common';
import { CryptographyService } from '../../../cryptography/cryptography.service';
import { TechnicalAreaDto } from '../../../entity/technical-area/domain/technical-area.dto';
import { TechnicalArea } from '../../../entity/technical-area/domain/technical-area.schema';
import { TechnicalAreaService } from '../../../entity/technical-area/service/technical-area.service';
import { DashboardLogger } from '../../../logger/dashboard-logger.service';
import { TechnicalAreaOperation } from './technical-area-operation';

@Injectable()
export class TechnicalAreaOperationService {

    constructor(
        private readonly service: TechnicalAreaService,
        private readonly cService: CryptographyService,
        private readonly logger: DashboardLogger
    ) {
        this.logger.setContext('TechnicalAreaOperationService');
    }

    async apply(operation: TechnicalAreaOperation): Promise<TechnicalArea> {
        this.logger.log('Applying operation' + JSON.stringify(operation));

        const searchResult = await (this.service.find({ name: `${operation.name}` }));

        if (searchResult.length === 0) {
            return this.service.create(new TechnicalAreaDto(operation));
        } else {
            return this.service.update(searchResult[0]._id, this.applyOperationAndReturnDto(operation, searchResult[0]));
        }
    }

    private applyOperationAndReturnDto(operation: TechnicalAreaOperation, entity: TechnicalArea): TechnicalAreaDto {
        const entityDto = new TechnicalAreaDto(entity);
        entityDto.numberOfProjects = entityDto.numberOfProjects + operation.numberOfProjects;
        entityDto.totalBudget = this.cService.add(entityDto.totalBudget, operation.totalBudget);
        entityDto.totalPaid = this.cService.add(entityDto.totalPaid, operation.totalPaid);
        entityDto.totalRealized = this.cService.add(entityDto.totalRealized, operation.totalRealized);
        return entityDto;
    }
}
