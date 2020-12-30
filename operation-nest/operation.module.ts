import { HttpModule, Module } from '@nestjs/common';
import { CostElementModule } from '../entity/cost-element/cost-element.module';
import { ExpectedParcelModule } from '../entity/expected-parcel/expected-parcel.module';
import { PaymentModule } from '../entity/payment/payment.module';
import { RealizedParcelModule } from '../entity/realized-parcel/realized-parcel.module';
import { TechnicalAreaModule } from '../entity/technical-area/technical-area.module';
import { CostElementOperationModule } from './entity/cost-element-operation/cost-element-operation.module';
import { ExpectedParcelOperationModule } from './entity/expected-parcel-operation/expected-parcel-operation.module';
import { PaymentOperationModule } from './entity/payment-operation/payment-operation.module';
import { RealizedParcelOperationModule } from './entity/realized-parcel-operation/realized-parcel-operation.module';
import { TechnicalAreaOperationModule } from './entity/technical-area-operation/technical-area-operation.module';
import { OperationController } from './operation.controller';


@Module({
  imports: [
    HttpModule,
    CostElementModule,
    PaymentModule,
    ExpectedParcelModule,
    RealizedParcelModule,
    TechnicalAreaModule,
    CostElementOperationModule,
    PaymentOperationModule,
    ExpectedParcelOperationModule,
    RealizedParcelOperationModule,
    TechnicalAreaOperationModule,
  ],
  controllers: [OperationController],
})
export class OperationModule { }
