import { Injectable } from '@nestjs/common';
import { EmailService } from '../email.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserRegisteredHandler {
  constructor(private readonly emailService: EmailService) {}

  @OnEvent('user.registered', { async: true })
  handle(payload: { email: string; name: string }) {
    this.emailService.sendActivationEmail(payload.email, payload.name);
  }
}
