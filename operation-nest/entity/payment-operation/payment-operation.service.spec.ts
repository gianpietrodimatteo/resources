import { Test, TestingModule } from '@nestjs/testing';
import { PaymentOperationService } from './payment-operation.service';

describe('PaymentOperationService', () => {
  let service: PaymentOperationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentOperationService],
    }).compile();

    service = module.get<PaymentOperationService>(PaymentOperationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
