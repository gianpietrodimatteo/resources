import { Test, TestingModule } from '@nestjs/testing';
import { CostElementOperationService } from './cost-element-operation.service';

describe('CostElementOperationService', () => {
  let service: CostElementOperationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CostElementOperationService],
    }).compile();

    service = module.get<CostElementOperationService>(CostElementOperationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
