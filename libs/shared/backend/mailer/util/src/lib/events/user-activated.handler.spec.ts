import { Test, TestingModule } from '@nestjs/testing';
import { UserActivatedHandler } from './user-activated.handler';
import { faker } from '@faker-js/faker';
import { EmailService } from '../email.service';

describe('UserActivatedHandler', () => {
  let provider: UserActivatedHandler;

  const payload = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
  };

  const mockEmailService = {
    sendActivationSuccessEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserActivatedHandler],
    })
      .useMocker((token) => {
        if (token === EmailService) {
          return mockEmailService;
        }
        return;
      })
      .compile();

    provider = module.get<UserActivatedHandler>(UserActivatedHandler);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  it('should send activation success email', () => {
    provider.handle(payload);
    expect(mockEmailService.sendActivationSuccessEmail).toHaveBeenCalledWith(
      payload.email,
      payload.name,
    );
  });
});
