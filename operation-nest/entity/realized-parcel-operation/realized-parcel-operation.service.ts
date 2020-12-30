import { Injectable } from '@nestjs/common';
import { CryptographyService } from '../../../cryptography/cryptography.service';
import { RealizedParcelDto } from '../../../entity/realized-parcel/domain/realized-parcel.dto';
import { RealizedParcel } from '../../../entity/realized-parcel/domain/realized-parcel.shema';
import { RealizedParcelService } from '../../../entity/realized-parcel/service/realized-parcel.service';
import { DashboardLogger } from '../../../logger/dashboard-logger.service';
import { RealizedParcelOperation } from './realized-parcel-operation';

@Injectable()
export class RealizedParcelOperationService {

    constructor(
        private readonly service: RealizedParcelService,
        private readonly cService: CryptographyService,
        private readonly logger: DashboardLogger
    ) {
        this.logger.setContext('RealizedParcelOperationService');
    }

    async apply(operation: RealizedParcelOperation): Promise<RealizedParcel> {
        this.logger.log('Applying operation' + JSON.stringify(operation));

        const searchResult = await (this.service.find({
            year: `${operation.year}`, month: `${operation.month}`, approved: `${operation.approved}`
        }));

        if (searchResult.length === 0) {
            return this.service.create(new RealizedParcelDto(operation));
        } else {
            return this.service.update(searchResult[0]._id, this.applyOperationAndReturnDto(operation, searchResult[0]));
        }
    }

    private applyOperationAndReturnDto(operation: RealizedParcelOperation, entity: RealizedParcel): RealizedParcelDto {
        const entityDto = new RealizedParcelDto(entity);
        entityDto.monthlySum = this.cService.add(entityDto.monthlySum, operation.monthlySum);
        return entityDto;
    }
}
