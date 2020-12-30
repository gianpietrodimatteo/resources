import { Module } from '@nestjs/common';
import { TechnicalAreaModule } from '../../../entity/technical-area/technical-area.module';
import { TechnicalAreaOperationService } from './technical-area-operation.service';

@Module({
  imports: [TechnicalAreaModule],
  providers: [TechnicalAreaOperationService],
  exports: [TechnicalAreaOperationService],
})
export class TechnicalAreaOperationModule { }
