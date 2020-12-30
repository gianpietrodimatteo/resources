import { Injectable } from '@nestjs/common';
import { CryptographyService } from '../../../cryptography/cryptography.service';
import { PaymentDto } from '../../../entity/payment/domain/payment.dto';
import { Payment } from '../../../entity/payment/domain/payment.shema';
import { PaymentService } from '../../../entity/payment/service/payment.service';
import { DashboardLogger } from '../../../logger/dashboard-logger.service';
import { PaymentOperation } from './payment-operation';

@Injectable()
export class PaymentOperationService {

    constructor(
        private readonly service: PaymentService,
        private readonly cService: CryptographyService,
        private readonly logger: DashboardLogger
    ) {
        this.logger.setContext('PaymentOperationService');
    }

    async apply(operation: PaymentOperation): Promise<Payment> {
        this.logger.log('Applying operation' + JSON.stringify(operation));

        const searchResult = await (this.service.find({ year: `${operation.year}`, month: `${operation.month}` }));

        if (searchResult.length === 0) {
            return this.service.create(new PaymentDto(operation));
        } else {
            return this.service.update(searchResult[0]._id, this.applyOperationAndReturnDto(operation, searchResult[0]));
        }
    }

    private applyOperationAndReturnDto(operation: PaymentOperation, entity: Payment): PaymentDto {
        const entityDto = new PaymentDto(entity);
        entityDto.monthlySum = this.cService.add(entityDto.monthlySum, operation.monthlySum);
        return entityDto;
    }
}
