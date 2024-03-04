import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { BackendContactsApplicationModule } from '@nexanode/backend-contacts-application';

@Module({
  controllers: [ContactsController],
  imports: [BackendContactsApplicationModule],
  providers: [],
  exports: [],
})
export class BackendContactsPresentationModule {}
