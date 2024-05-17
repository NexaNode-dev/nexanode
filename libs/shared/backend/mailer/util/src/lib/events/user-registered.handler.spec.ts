import { Test, TestingModule } from '@nestjs/testing';
import { UserRegisteredHandler } from './user-registered.handler';
import { faker } from '@faker-js/faker';
import { EmailService } from '../email.service';

describe('UserRegisteredHandler', () => {
  let provider: UserRegisteredHandler;

  const payload = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
  };

  const mockEmailService = {
    sendActivationEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRegisteredHandler],
    })
      .useMocker((token) => {
        if (token === EmailService) {
          return mockEmailService;
        }
        return;
      })
      .compile();

    provider = module.get<UserRegisteredHandler>(UserRegisteredHandler);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  it('should send activation email', () => {
    provider.handle(payload);
    expect(mockEmailService.sendActivationEmail).toHaveBeenCalledWith(
      payload.email,
      payload.name,
    );
  });
});
