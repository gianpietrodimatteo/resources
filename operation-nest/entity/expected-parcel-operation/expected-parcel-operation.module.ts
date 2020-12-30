import { Module } from '@nestjs/common';
import { ExpectedParcelModule } from '../../../entity/expected-parcel/expected-parcel.module';
import { ExpectedParcelOperationService } from './expected-parcel-operation.service';

@Module({
  imports: [ExpectedParcelModule],
  providers: [ExpectedParcelOperationService],
  exports: [ExpectedParcelOperationService]
})
export class ExpectedParcelOperationModule { }
