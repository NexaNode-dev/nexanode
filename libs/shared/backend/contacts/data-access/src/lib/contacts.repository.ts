import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IContact } from '@nexanode/domain-interfaces';
import { FindManyOptions, Repository } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactsRepository {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
  ) {}

  findAll(options?: FindManyOptions<Contact>): Promise<Contact[]> {
    return this.contactsRepository.find(options);
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactsRepository.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Contact with id ${id} not found`);
    }
    return contact;
  }

  create(contact: Partial<IContact>): Promise<Contact> {
    return this.contactsRepository.save(
      this.contactsRepository.create(contact),
    );
  }

  async update(id: string, contact: Partial<IContact>): Promise<Contact> {
    const existingContact = await this.contactsRepository.preload({
      id,
      ...contact,
    });
    if (!existingContact) {
      throw new NotFoundException(`Contact with id ${id} not found`);
    }
    return this.contactsRepository.save(existingContact);
  }

  async delete(id: string): Promise<string> {
    const contact = await this.findOne(id);
    await this.contactsRepository.remove(contact);
    return id;
  }
}
