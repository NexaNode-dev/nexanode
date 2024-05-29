import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationsService } from './organisations.service';
import {
  organisationFactory,
  organisationTypeFactory,
  organisationTypesFactory,
  organisationsFactory,
} from '@nexanode/testing-data-mocks-utils';
import {
  OrganisationTypesRepository,
  OrganisationsRepository,
} from '@nexanode/backend-organisations-data-access';

describe('OrganisationsService', () => {
  let service: OrganisationsService;

  const expectedOrganisation = organisationFactory();

  const expectedOrganisations = [expectedOrganisation, organisationsFactory()];

  const expectedOrganisationType = organisationTypeFactory();

  const expectedOrganisationTypes = [
    expectedOrganisationType,
    organisationTypesFactory(),
  ];

  const mockOrganisationsRepository = {
    getOrganisations: jest.fn().mockResolvedValue(expectedOrganisations),
    getOrganisation: jest.fn().mockResolvedValue(expectedOrganisation),
    createOrganisation: jest.fn().mockResolvedValue(expectedOrganisation),
    updateOrganisation: jest.fn().mockResolvedValue(expectedOrganisation),
    deleteOrganisation: jest.fn().mockResolvedValue(expectedOrganisation.id),
  };

  const mockOrganisationTypesRepository = {
    getOrganisationTypes: jest
      .fn()
      .mockResolvedValue(expectedOrganisationTypes),
    getOrganisationType: jest.fn().mockResolvedValue(expectedOrganisationType),
    createOrganisationType: jest
      .fn()
      .mockResolvedValue(expectedOrganisationType),
    updateOrganisationType: jest
      .fn()
      .mockResolvedValue(expectedOrganisationType),
    deleteOrganisationType: jest
      .fn()
      .mockResolvedValue(expectedOrganisationType.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganisationsService],
    })
      .useMocker((token) => {
        if (token === OrganisationsRepository) {
          return mockOrganisationsRepository;
        } else if (token === OrganisationTypesRepository) {
          return mockOrganisationTypesRepository;
        }
        return;
      })
      .compile();

    service = module.get<OrganisationsService>(OrganisationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getOrganisations', () => {
    it('should return organisations', async () => {
      expect(await service.getOrganisations()).toEqual(expectedOrganisations);
    });
  });
  describe('getOrganisation', () => {
    it('should return organisation', async () => {
      expect(await service.getOrganisation()).toEqual(expectedOrganisation);
    });
    it('should throw an error if organisation not found', async () => {
      mockOrganisationsRepository.getOrganisation.mockRejectedValueOnce(
        new Error(),
      );
      try {
        await service.getOrganisation();
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });
  describe('createOrganisation', () => {
    it('should create organisation', async () => {
      expect(await service.createOrganisation(expectedOrganisation)).toEqual(
        expectedOrganisation,
      );
    });
  });
  describe('updateOrganisation', () => {
    it('should update organisation', async () => {
      expect(
        await service.updateOrganisation(
          expectedOrganisation.id,
          expectedOrganisation,
        ),
      ).toEqual(expectedOrganisation);
    });
    it('should throw an error if organisation not found', async () => {
      mockOrganisationsRepository.updateOrganisation.mockRejectedValueOnce(
        new Error(),
      );
      try {
        await service.updateOrganisation(
          expectedOrganisation.id,
          expectedOrganisation,
        );
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });
  describe('deleteOrganisation', () => {
    it('should delete organisation', async () => {
      expect(await service.deleteOrganisation(expectedOrganisation.id)).toEqual(
        expectedOrganisation.id,
      );
    });
    it('should throw an error if organisation not found', async () => {
      mockOrganisationsRepository.deleteOrganisation.mockRejectedValueOnce(
        new Error(),
      );
      try {
        await service.deleteOrganisation(expectedOrganisation.id);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });
  describe('getOrganisationTypes', () => {
    it('should return organisation types', async () => {
      expect(await service.getOrganisationTypes()).toEqual(
        expectedOrganisationTypes,
      );
    });
  });
  describe('getOrganisationType', () => {
    it('should return organisation type', async () => {
      expect(await service.getOrganisationType()).toEqual(
        expectedOrganisationType,
      );
    });
    it('should throw an error if organisation type not found', async () => {
      mockOrganisationTypesRepository.getOrganisationType.mockRejectedValueOnce(
        new Error(),
      );
      try {
        await service.getOrganisationType();
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });
  describe('createOrganisationType', () => {
    it('should create organisation type', async () => {
      expect(
        await service.createOrganisationType(expectedOrganisationType),
      ).toEqual(expectedOrganisationType);
    });
  });
  describe('updateOrganisationType', () => {
    it('should update organisation type', async () => {
      expect(
        await service.updateOrganisationType(
          expectedOrganisationType.id,
          expectedOrganisationType,
        ),
      ).toEqual(expectedOrganisationType);
    });
    it('should throw an error if organisation type not found', async () => {
      mockOrganisationTypesRepository.updateOrganisationType.mockRejectedValueOnce(
        new Error(),
      );
      try {
        await service.updateOrganisationType(
          expectedOrganisationType.id,
          expectedOrganisationType,
        );
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });
  describe('deleteOrganisationType', () => {
    it('should delete organisation type', async () => {
      expect(
        await service.deleteOrganisationType(expectedOrganisationType.id),
      ).toEqual(expectedOrganisationType.id);
    });
    it('should throw an error if organisation type not found', async () => {
      mockOrganisationTypesRepository.deleteOrganisationType.mockRejectedValueOnce(
        new Error(),
      );
      try {
        await service.deleteOrganisationType(expectedOrganisationType.id);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });
});
