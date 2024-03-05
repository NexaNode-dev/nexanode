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
    findAll: jest.fn().mockResolvedValue(expectedContacts),
    findOne: jest.fn().mockResolvedValue(expectedContact),
    create: jest.fn().mockResolvedValue(expectedContact),
    update: jest.fn().mockResolvedValue(expectedContact),
    delete: jest.fn().mockResolvedValue(expectedContact.id),
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
      expect(await service.findAll()).toEqual(expectedContacts);
      expect(mockRepository.findAll).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a contact', async () => {
      expect(await service.findOne(expectedContact.id)).toEqual(
        expectedContact,
      );
      expect(mockRepository.findOne).toHaveBeenCalledWith(expectedContact.id);
    });
    it('should throw an error if the contact does not exist', async () => {
      mockRepository.findOne.mockRejectedValueOnce(new Error());
      await expect(service.findOne(expectedContact.id)).rejects.toThrow();
    });
  });
  describe('create', () => {
    it('should create a contact, send an email to the owner and one to the submitter', async () => {
      expect(await service.create(expectedContact)).toEqual(expectedContact);
      expect(mockMailService.sendMail).toHaveBeenCalledTimes(2);
      expect(mockRepository.create).toHaveBeenCalledWith(expectedContact);
    });
  });
  describe('update', () => {
    it('should update a contact', async () => {
      expect(await service.update(expectedContact.id, expectedContact)).toEqual(
        expectedContact,
      );
      expect(mockRepository.update).toHaveBeenCalledWith(
        expectedContact.id,
        expectedContact,
      );
    });
    it('should throw an error if the contact does not exist', async () => {
      mockRepository.update.mockRejectedValueOnce(new Error());
      await expect(
        service.update(expectedContact.id, expectedContact),
      ).rejects.toThrow();
    });
  });
  describe('delete', () => {
    it('should delete a contact', async () => {
      expect(await service.delete(expectedContact.id)).toEqual(
        expectedContact.id,
      );
      expect(mockRepository.delete).toHaveBeenCalledWith(expectedContact.id);
    });
    it('should throw an error if the contact does not exist', async () => {
      mockRepository.delete.mockRejectedValueOnce(new Error());
      await expect(service.delete(expectedContact.id)).rejects.toThrow();
    });
  });
});
