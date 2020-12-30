import { Test, TestingModule } from '@nestjs/testing';
import { RealizedParcelOperationService } from './realized-parcel-operation.service';

describe('RealizedParcelOperationService', () => {
  let service: RealizedParcelOperationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealizedParcelOperationService],
    }).compile();

    service = module.get<RealizedParcelOperationService>(RealizedParcelOperationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
