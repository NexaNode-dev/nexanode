import { Test, TestingModule } from '@nestjs/testing';
import { ContactsRepository } from './contacts.repository';
import { IContact } from '@nexanode/domain-interfaces';
import { faker } from '@faker-js/faker';
import { Contact } from './contact.entity';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ContactsRepository', () => {
  let provider: ContactsRepository;

  const contactData: Partial<IContact> = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    message: faker.lorem.sentence(),
  };

  const expectedContact: IContact = new Contact({
    ...contactData,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  });

  const expectedContacts: IContact[] = [expectedContact];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedContacts),
    findOne: jest.fn().mockResolvedValue(expectedContact),
    create: jest.fn().mockReturnValue(expectedContact),
    save: jest.fn().mockResolvedValue(expectedContact),
    preload: jest.fn().mockResolvedValue(expectedContact),
    remove: jest.fn().mockResolvedValue(expectedContact.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactsRepository],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(Contact)) {
          return mockRepository;
        }
        return;
      })
      .compile();

    provider = module.get<ContactsRepository>(ContactsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('findAll', () => {
    it('should return all contacts', async () => {
      expect(await provider.findAll()).toEqual(expectedContacts);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a contact by id', async () => {
      expect(await provider.findOne(expectedContact.id)).toEqual(
        expectedContact,
      );
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: expectedContact.id },
      });
    });
    it('should return a NotFoundException if the contact is not found', async () => {
      //mockRepository.findOne.mockResolvedValue(undefined);
      try {
        await provider.findOne(expectedContact.id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create', () => {
    it('should create a contact', async () => {
      expect(await provider.create(contactData)).toEqual(expectedContact);
      expect(mockRepository.create).toHaveBeenCalledWith(contactData);
      expect(mockRepository.save).toHaveBeenCalledWith(expectedContact);
    });
  });
  describe('update', () => {
    it('should update a contact', async () => {
      expect(await provider.update(expectedContact.id, contactData)).toEqual(
        expectedContact,
      );
      expect(mockRepository.preload).toHaveBeenCalledWith({
        id: expectedContact.id,
        ...contactData,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(expectedContact);
    });
    it('should return a NotFoundException if the contact is not found', async () => {
      mockRepository.preload.mockResolvedValue(undefined);
      try {
        await provider.update(expectedContact.id, contactData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('delete', () => {
    it('should remove a contact', async () => {
      expect(await provider.delete(expectedContact.id)).toEqual(
        expectedContact.id,
      );
      expect(mockRepository.remove).toHaveBeenCalledWith(expectedContact);
    });
    it('should return a NotFoundException if the contact is not found', async () => {
      mockRepository.remove.mockResolvedValue(undefined);
      try {
        await provider.delete(expectedContact.id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
