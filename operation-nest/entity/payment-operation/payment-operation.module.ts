import { Module } from '@nestjs/common';
import { PaymentModule } from '../../../entity/payment/payment.module';
import { PaymentOperationService } from './payment-operation.service';

@Module({
  imports: [PaymentModule],
  providers: [PaymentOperationService],
  exports: [PaymentOperationService]
})
export class PaymentOperationModule { }
