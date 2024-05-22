import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { UserActivatedHandler } from './events/user-activated.handler';
import { UserRegisteredHandler } from './events/user-registered.handler';

@Module({
  controllers: [],
  providers: [EmailService, UserRegisteredHandler, UserActivatedHandler],
  exports: [],
})
export class BackendMailerUtilModule {}
