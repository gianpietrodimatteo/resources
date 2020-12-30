import { Injectable } from '@nestjs/common';
import { CryptographyService } from '../../../cryptography/cryptography.service';
import { ExpectedParcelDto } from '../../../entity/expected-parcel/domain/expected-parcel.dto';
import { ExpectedParcel } from '../../../entity/expected-parcel/domain/expected-parcel.schema';
import { ExpectedParcelService } from '../../../entity/expected-parcel/service/expected-parcel.service';
import { DashboardLogger } from '../../../logger/dashboard-logger.service';
import { ExpectedParcelOperation } from './expected-parcel-operation';

@Injectable()
export class ExpectedParcelOperationService {

    constructor(
        private readonly service: ExpectedParcelService,
        private readonly cService: CryptographyService,
        private readonly logger: DashboardLogger
    ) {
        this.logger.setContext('ExpectedParcelOperationService');
    }

    async apply(operation: ExpectedParcelOperation): Promise<ExpectedParcel> {
        this.logger.log('Applying operation' + JSON.stringify(operation));

        const searchResult = await (this.service.find({ year: `${operation.year}`, month: `${operation.month}` }));

        if (searchResult.length === 0) {
            return this.service.create(new ExpectedParcelDto(operation));
        } else {
            return this.service.update(searchResult[0]._id, this.applyOperationAndReturnDto(operation, searchResult[0]));
        }
    }

    private applyOperationAndReturnDto(operation: ExpectedParcelOperation, entity: ExpectedParcel): ExpectedParcelDto {
        const entityDto = new ExpectedParcelDto(entity);
        entityDto.monthlySum = this.cService.add(entityDto.monthlySum, operation.monthlySum);
        return entityDto;
    }

}
