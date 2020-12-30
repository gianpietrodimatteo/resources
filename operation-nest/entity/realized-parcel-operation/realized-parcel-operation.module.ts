import { Module } from '@nestjs/common';
import { RealizedParcelModule } from '../../../entity/realized-parcel/realized-parcel.module';
import { RealizedParcelOperationService } from './realized-parcel-operation.service';

@Module({
  imports: [RealizedParcelModule],
  providers: [RealizedParcelOperationService],
  exports: [RealizedParcelOperationService]
})
export class RealizedParcelOperationModule { }
