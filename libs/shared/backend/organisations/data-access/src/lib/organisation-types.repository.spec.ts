import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationTypesRepository } from './organisation-types.repository';
import { OrganisationType } from './organisation-type.entity';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('OrganisationTypesProvider', () => {
  let provider: OrganisationTypesRepository;

  const organisationTypeData: Partial<OrganisationType> = {
    name: faker.company.name(),
  };

  const expectedOrganisationType: OrganisationType = new OrganisationType({
    ...organisationTypeData,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  });

  const expectedOrganisationTypes: OrganisationType[] = [
    expectedOrganisationType,
  ];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedOrganisationTypes),
    findOne: jest.fn().mockResolvedValue(expectedOrganisationType),
    create: jest.fn().mockReturnValue(expectedOrganisationType),
    save: jest.fn().mockResolvedValue(expectedOrganisationType),
    preload: jest.fn().mockResolvedValue(expectedOrganisationType),
    remove: jest.fn().mockResolvedValue(expectedOrganisationType.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganisationTypesRepository],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(OrganisationType)) {
          return mockRepository;
        }
        return;
      })
      .compile();

    provider = module.get<OrganisationTypesRepository>(
      OrganisationTypesRepository,
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of organisation types', async () => {
      const result = await provider.getOrganisationTypes();
      expect(result).toEqual(expectedOrganisationTypes);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return an organisation type', async () => {
      const result = await provider.getOrganisationType({});
      expect(result).toEqual(expectedOrganisationType);
      expect(mockRepository.findOne).toHaveBeenCalled();
    });
    it('should throw a NotFoundException if the organisation type is not found', async () => {
      try {
        await provider.getOrganisationType({});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create', () => {
    it('should create an organisation type', async () => {
      const result =
        await provider.createOrganisationType(organisationTypeData);
      expect(result).toEqual(expectedOrganisationType);
      expect(mockRepository.create).toHaveBeenCalledWith(organisationTypeData);
      expect(mockRepository.save).toHaveBeenCalledWith(
        expectedOrganisationType,
      );
    });
  });
  describe('update', () => {
    it('should update an organisation type', async () => {
      const result = await provider.updateOrganisationType(
        expectedOrganisationType.id,
        organisationTypeData,
      );
      expect(result).toEqual(expectedOrganisationType);
      expect(mockRepository.preload).toHaveBeenCalledWith({
        id: expectedOrganisationType.id,
        ...organisationTypeData,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(
        expectedOrganisationType,
      );
    });
    it('should throw a NotFoundException if the organisation type is not found', async () => {
      try {
        await provider.updateOrganisationType(
          faker.string.uuid(),
          organisationTypeData,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('delete', () => {
    it('should delete an organisation type', async () => {
      const result = await provider.deleteOrganisationType(
        expectedOrganisationType.id,
      );
      expect(result).toEqual(expectedOrganisationType.id);
      expect(mockRepository.remove).toHaveBeenCalledWith(
        expectedOrganisationType,
      );
    });
  });
});
