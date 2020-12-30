import { Test, TestingModule } from '@nestjs/testing';
import { ExpectedParcelOperationService } from './expected-parcel-operation.service';

describe('ExpectedParcelOperationService', () => {
  let service: ExpectedParcelOperationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpectedParcelOperationService],
    }).compile();

    service = module.get<ExpectedParcelOperationService>(ExpectedParcelOperationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
