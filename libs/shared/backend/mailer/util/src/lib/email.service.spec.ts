import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { faker } from '@faker-js/faker';
import { MailerService } from '@nestjs-modules/mailer';

describe('EmailService', () => {
  let service: EmailService;

  const email = faker.internet.email();
  const name = faker.person.fullName();

  const mockMailerService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService],
    })
      .useMocker((token) => {
        if (token === MailerService) {
          return mockMailerService;
        }
        return;
      })
      .compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should send registration email', () => {
    expect(service.sendRegistrationEmail(email, name)).toBeUndefined();
    expect(mockMailerService.sendMail).toHaveBeenCalled();
  });
  it('should send activation email', () => {
    expect(service.sendActivationEmail(email, name)).toBeUndefined();
    expect(mockMailerService.sendMail).toHaveBeenCalled();
  });
  it('should send activation success email', () => {
    expect(service.sendActivationSuccessEmail(email, name)).toBeUndefined();
    expect(mockMailerService.sendMail).toHaveBeenCalled();
  });
});
