import { Injectable } from '@nestjs/common';
import { ContactsRepository } from '@nexanode/backend-contacts-data-access';
import { IContact } from '@nexanode/domain-interfaces';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ContactsService {
  constructor(
    private readonly contactsRepository: ContactsRepository,
    private mailerService: MailerService,
  ) {}

  getContacts(): Promise<IContact[]> {
    return this.contactsRepository.getContacts();
  }

  getContactById(id: string): Promise<IContact> {
    return this.contactsRepository.getContact({ where: { id } });
  }

  async createContact(contactData: Partial<IContact>): Promise<IContact> {
    const contact = await this.contactsRepository.createContact(contactData);
    //send mail to the submitter
    await this.mailerService.sendMail({
      to: `${contact.name} <${contact.email}>`,
      subject: 'Contact Form Submission Confirmation',
      text: 'Thank you for contacting us. We will get back to you shortly.',
    });
    //send mail to the admin
    await this.mailerService.sendMail({
      from: `${contact.name} <${contact.email}>`,
      subject: 'New Contact Form Submission',
      text: `Name: ${contact.name}\nEmail: ${contact.email}\nMessage: ${contact.message}`,
    });
    return contact;
  }

  updateContact(id: string, contactData: Partial<IContact>): Promise<IContact> {
    return this.contactsRepository.updateContact(id, contactData);
  }

  deleteContact(id: string): Promise<string | null> {
    return this.contactsRepository.deleteContact(id);
  }
}
