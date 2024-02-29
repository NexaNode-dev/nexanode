import { Module } from '@nestjs/common';
import { ContactsRepository } from './contacts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactsRepository],
  exports: [ContactsRepository, TypeOrmModule],
})
export class BackendContactsDataAccessModule {}
