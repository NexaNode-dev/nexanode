import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IContact } from '@nexanode/domain-interfaces';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactsRepository extends Repository<Contact> {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
  ) {
    super(Contact, contactsRepository.manager, contactsRepository.queryRunner);
  }

  getContacts(options: FindManyOptions<Contact> = {}): Promise<Contact[]> {
    return this.contactsRepository.find(options);
  }

  async getContact(options: FindOneOptions<Contact> = {}): Promise<Contact> {
    const contact = await this.contactsRepository.findOne(options);
    if (!contact) {
      throw new NotFoundException(
        `Contact with options ${JSON.stringify(options)} not found`,
      );
    }
    return contact;
  }

  createContact(contact: Partial<IContact>): Promise<Contact> {
    return this.contactsRepository.save(
      this.contactsRepository.create(contact),
    );
  }

  async updateContact(
    id: string,
    contact: Partial<IContact>,
  ): Promise<Contact> {
    const existingContact = await this.contactsRepository.preload({
      id,
      ...contact,
    });
    if (!existingContact) {
      throw new NotFoundException(`Contact with id ${id} not found`);
    }
    return this.contactsRepository.save(existingContact);
  }

  async deleteContact(id: string): Promise<string> {
    const contact = await this.getContact({ where: { id } });
    await this.contactsRepository.remove(contact);
    return id;
  }
}
