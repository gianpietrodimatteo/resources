import { Test, TestingModule } from '@nestjs/testing';
import { TechnicalAreaOperationService } from './technical-area-operation.service';

describe('TechnicalAreaOperationService', () => {
  let service: TechnicalAreaOperationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnicalAreaOperationService],
    }).compile();

    service = module.get<TechnicalAreaOperationService>(TechnicalAreaOperationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
