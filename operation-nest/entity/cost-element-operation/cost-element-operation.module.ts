import { Module } from '@nestjs/common';
import { CostElementModule } from 'src/entity/cost-element/cost-element.module';
import { CostElementOperationService } from './cost-element-operation.service';


@Module({
  imports: [CostElementModule],
  providers: [CostElementOperationService],
  exports: [CostElementOperationService]
})
export class CostElementOperationModule { }
