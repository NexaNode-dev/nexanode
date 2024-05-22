import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerSevice: MailerService) {}

  sendRegistrationEmail(email: string, name: string) {
    this.mailerSevice.sendMail({
      to: email,
      subject: 'Finish your registration',
      template: 'registration',
      context: {
        email: email,
        name: name,
      },
    });
  }

  sendActivationEmail(email: string, name: string) {
    this.mailerSevice.sendMail({
      to: email,
      subject: 'Activate your account',
      template: 'activation',
      context: {
        email: email,
        name: name,
      },
    });
  }

  sendActivationSuccessEmail(email: string, name: string) {
    this.mailerSevice.sendMail({
      to: email,
      subject: 'Account activated',
      template: 'activation-success',
      context: {
        email: email,
        name: name,
      },
    });
  }
}
