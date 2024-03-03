import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { BackendContactsDataAccessModule } from '@nexanode/backend-contacts-data-access';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [BackendContactsDataAccessModule, MailerModule.forRoot({})],
  providers: [ContactsService],
  exports: [ContactsService],
})
export class BackendContactsApplicationModule {}
