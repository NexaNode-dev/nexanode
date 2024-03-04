import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { faker } from '@faker-js/faker';
import { CreateContactDto } from './dtos/create-contact.dto';
import { IContact } from '@nexanode/domain-interfaces';
import { ContactsService } from '@nexanode/backend-contacts-application';

describe('ContactsController', () => {
  let controller: ContactsController;

  const contactData: CreateContactDto = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    message: faker.lorem.sentence(),
  };

  const expectedContact: IContact = {
    id: faker.string.uuid(),
    ...contactData,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  const expectedContacts: IContact[] = [expectedContact];

  const mockService = {
    findAll: jest.fn().mockResolvedValue(expectedContacts),
    findOne: jest.fn().mockResolvedValue(expectedContact),
    create: jest.fn().mockResolvedValue(expectedContact),
    update: jest.fn().mockResolvedValue(expectedContact),
    delete: jest.fn().mockResolvedValue(expectedContact.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [
        {
          provide: ContactsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of contacts', async () => {
      expect(await controller.findAll()).toEqual(expectedContacts);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a contact', async () => {
      expect(await controller.findOne(expectedContact.id)).toEqual(
        expectedContact,
      );
      expect(mockService.findOne).toHaveBeenCalledWith(expectedContact.id);
    });
    it('should throw an error if contact not found', async () => {
      mockService.findOne.mockRejectedValueOnce(new Error('Not found'));
      await expect(controller.findOne(expectedContact.id)).rejects.toThrow();
    });
  });
  describe('create', () => {
    it('should create a contact', async () => {
      expect(await controller.create(contactData)).toEqual(expectedContact);
      expect(mockService.create).toHaveBeenCalledWith(contactData);
    });
  });
  describe('update', () => {
    it('should update a contact', async () => {
      expect(await controller.update(expectedContact.id, contactData)).toEqual(
        expectedContact,
      );
      expect(mockService.update).toHaveBeenCalledWith(
        expectedContact.id,
        contactData,
      );
    });
    it('should throw an error if contact not found', async () => {
      mockService.update.mockRejectedValueOnce(new Error('Not found'));
      await expect(
        controller.update(expectedContact.id, contactData),
      ).rejects.toThrow();
    });
  });
  describe('delete', () => {
    it('should delete a contact', async () => {
      expect(await controller.delete(expectedContact.id)).toEqual(
        expectedContact.id,
      );
      expect(mockService.delete).toHaveBeenCalledWith(expectedContact.id);
    });
    it('should throw an error if contact not found', async () => {
      mockService.delete.mockRejectedValueOnce(new Error('Not found'));
      await expect(controller.delete(expectedContact.id)).rejects.toThrow();
    });
  });
});
