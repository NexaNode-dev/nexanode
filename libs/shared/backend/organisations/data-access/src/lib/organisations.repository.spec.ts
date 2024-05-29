import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationsRepository } from './organisations.repository';
import { Organisation } from './organisation.entity';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('OrganisationsRepository', () => {
  let provider: OrganisationsRepository;

  const organisationData: Partial<Organisation> = {
    name: faker.company.name(),
    typeId: faker.string.uuid(),
  };

  const expectedOrganisation: Organisation = new Organisation({
    ...organisationData,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  });

  const expectedOrganisations: Organisation[] = [expectedOrganisation];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedOrganisations),
    findOne: jest.fn().mockResolvedValue(expectedOrganisation),
    create: jest.fn().mockReturnValue(expectedOrganisation),
    save: jest.fn().mockResolvedValue(expectedOrganisation),
    preload: jest.fn().mockResolvedValue(expectedOrganisation),
    remove: jest.fn().mockResolvedValue(expectedOrganisation.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganisationsRepository],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(Organisation)) {
          return mockRepository;
        }
        return;
      })
      .compile();

    provider = module.get<OrganisationsRepository>(OrganisationsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of organisations', async () => {
      const result = await provider.getOrganisations();
      expect(result).toEqual(expectedOrganisations);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return an organisation', async () => {
      const result = await provider.getOrganisation();
      expect(result).toEqual(expectedOrganisation);
      expect(mockRepository.findOne).toHaveBeenCalled();
    });
    it('should throw a NotFoundException if the organisation is not found', async () => {
      try {
        await provider.getOrganisation({ where: { id: faker.string.uuid() } });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create', () => {
    it('should create an organisation', async () => {
      const result = await provider.createOrganisation(organisationData);
      expect(result).toEqual(expectedOrganisation);
      expect(mockRepository.create).toHaveBeenCalledWith(organisationData);
      expect(mockRepository.save).toHaveBeenCalledWith(expectedOrganisation);
    });
  });
  describe('update', () => {
    it('should update an organisation', async () => {
      const result = await provider.updateOrganisation(
        faker.string.uuid(),
        organisationData,
      );
      expect(result).toEqual(expectedOrganisation);
      expect(mockRepository.preload).toHaveBeenCalledWith({
        id: expect.any(String),
        ...organisationData,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(expectedOrganisation);
    });
    it('should throw a NotFoundException if the organisation is not found', async () => {
      mockRepository.preload.mockResolvedValueOnce(undefined);
      try {
        await provider.updateOrganisation(
          faker.string.uuid(),
          organisationData,
        );
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('delete', () => {
    it('should delete an organisation', async () => {
      const result = await provider.deleteOrganisation(expectedOrganisation.id);
      expect(result).toEqual(expectedOrganisation.id);
      expect(mockRepository.remove).toHaveBeenCalled();
    });
    it('should throw a NotFoundException if the organisation is not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(undefined);
      try {
        await provider.deleteOrganisation(faker.string.uuid());
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
