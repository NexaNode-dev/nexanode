import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import { IContact } from '@nexanode/domain-interfaces';
import { faker } from '@faker-js/faker';
import { ContactsRepository } from '@nexanode/backend-contacts-data-access';
import { MailerService } from '@nestjs-modules/mailer';

describe('ContactsService', () => {
  let service: ContactsService;

  const expectedContact: IContact = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    message: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  const expectedContacts: IContact[] = [expectedContact];

  const mockMailService = {
    sendMail: jest.fn().mockResolvedValue(true),
  };

  const mockRepository = {
    getContacts: jest.fn().mockResolvedValue(expectedContacts),
    getContact: jest.fn().mockResolvedValue(expectedContact),
    createContact: jest.fn().mockResolvedValue(expectedContact),
    updateContact: jest.fn().mockResolvedValue(expectedContact),
    deleteContact: jest.fn().mockResolvedValue(expectedContact.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        { provide: ContactsRepository, useValue: mockRepository },
        { provide: MailerService, useValue: mockMailService },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of contacts', async () => {
      expect(await service.getContacts()).toEqual(expectedContacts);
      expect(mockRepository.getContacts).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a contact', async () => {
      expect(await service.getContactById(expectedContact.id)).toEqual(
        expectedContact,
      );
      expect(mockRepository.getContact).toHaveBeenCalledWith({
        where: { id: expectedContact.id },
      });
    });
    it('should throw an error if the contact does not exist', async () => {
      mockRepository.getContact.mockRejectedValueOnce(new Error());
      await expect(
        service.getContactById(expectedContact.id),
      ).rejects.toThrow();
    });
  });
  describe('create', () => {
    it('should create a contact, send an email to the owner and one to the submitter', async () => {
      expect(await service.createContact(expectedContact)).toEqual(
        expectedContact,
      );
      expect(mockMailService.sendMail).toHaveBeenCalledTimes(2);
      expect(mockRepository.createContact).toHaveBeenCalledWith(
        expectedContact,
      );
    });
  });
  describe('update', () => {
    it('should update a contact', async () => {
      expect(
        await service.updateContact(expectedContact.id, expectedContact),
      ).toEqual(expectedContact);
      expect(mockRepository.updateContact).toHaveBeenCalledWith(
        expectedContact.id,
        expectedContact,
      );
    });
    it('should throw an error if the contact does not exist', async () => {
      mockRepository.updateContact.mockRejectedValueOnce(new Error());
      await expect(
        service.updateContact(expectedContact.id, expectedContact),
      ).rejects.toThrow();
    });
  });
  describe('delete', () => {
    it('should delete a contact', async () => {
      expect(await service.deleteContact(expectedContact.id)).toEqual(
        expectedContact.id,
      );
      expect(mockRepository.deleteContact).toHaveBeenCalledWith(
        expectedContact.id,
      );
    });
    it('should throw an error if the contact does not exist', async () => {
      mockRepository.deleteContact.mockRejectedValueOnce(new Error());
      await expect(service.deleteContact(expectedContact.id)).rejects.toThrow();
    });
  });
});
