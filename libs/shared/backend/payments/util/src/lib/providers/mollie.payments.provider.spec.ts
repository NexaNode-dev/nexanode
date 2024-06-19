import { Test, TestingModule } from '@nestjs/testing';
import { MolliePaymentsProvider } from './mollie.payments.provider';

describe('MolliePaymentsProvider', () => {
  let provider: MolliePaymentsProvider;

  const mockMollieClient = {
    payments: {
      create: jest.fn(),
      get: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MolliePaymentsProvider],
    })
      .useMocker((token) => {
        if (token === 'MOLLIE_CLIENT') {
          return mockMollieClient;
        }
        return;
      })
      .compile();

    provider = module.get<MolliePaymentsProvider>(MolliePaymentsProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
