import { Injectable } from '@nestjs/common';
import { EmailService } from '../email.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserActivatedHandler {
  constructor(private readonly emailService: EmailService) {}

  @OnEvent('user.activated', { async: true })
  handle(payload: { email: string; name: string }) {
    this.emailService.sendActivationSuccessEmail(payload.email, payload.name);
  }
}
