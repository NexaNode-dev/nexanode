import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationsController } from './organisations.controller';
import {
  organisationTypesFactory,
  organisationsFactory,
} from '@nexanode/testing-data-mocks-utils';
import { OrganisationsService } from '@nexanode/backend-organisations-application';

describe('OrganisationsController', () => {
  let controller: OrganisationsController;

  const expectedOrganisations = organisationsFactory();

  const expectedOrganisation = expectedOrganisations[0];

  const expectedOrganisationTypes = organisationTypesFactory();

  const expectedOrganisationType = expectedOrganisationTypes[0];

  const mockOrganisationsService = {
    getOrganisations: jest.fn().mockResolvedValue(expectedOrganisations),
    getOrganisationById: jest.fn().mockResolvedValue(expectedOrganisation),
    createOrganisation: jest.fn().mockResolvedValue(expectedOrganisation),
    updateOrganisation: jest.fn().mockResolvedValue(expectedOrganisation),
    deleteOrganisation: jest.fn().mockResolvedValue(expectedOrganisation.id),
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
      controllers: [OrganisationsController],
    })
      .useMocker((token) => {
        if (token === OrganisationsService) {
          return mockOrganisationsService;
        }
        return;
      })
      .compile();

    controller = module.get<OrganisationsController>(OrganisationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getOrganisations', () => {
    it('should return all organisations', async () => {
      expect(await controller.getOrganisations({})).toEqual(
        expectedOrganisations,
      );
    });
  });
  describe('getOrganisationById', () => {
    it('should return an organisation', async () => {
      expect(
        await controller.getOrganisationById(expectedOrganisation.id),
      ).toEqual(expectedOrganisation);
    });
    it('should throw an error if the organisation does not exist', async () => {
      mockOrganisationsService.getOrganisationById.mockRejectedValue(
        new Error('Organisation not found'),
      );
      try {
        await controller.getOrganisationById('non-existing-id');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe('createOrganisation', () => {
    it('should create an organisation', async () => {
      expect(await controller.createOrganisation(expectedOrganisation)).toEqual(
        expectedOrganisation,
      );
    });
  });
  describe('updateOrganisation', () => {
    it('should update an organisation', async () => {
      expect(
        await controller.updateOrganisation(
          expectedOrganisation.id,
          expectedOrganisation,
        ),
      ).toEqual(expectedOrganisation);
    });
    it('should throw an error if the organisation does not exist', async () => {
      mockOrganisationsService.updateOrganisation.mockRejectedValue(
        new Error('Organisation not found'),
      );
      try {
        await controller.updateOrganisation(
          'non-existing-id',
          expectedOrganisation,
        );
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe('deleteOrganisation', () => {
    it('should delete an organisation', async () => {
      expect(
        await controller.deleteOrganisation(expectedOrganisation.id),
      ).toEqual(expectedOrganisation.id);
    });
    it('should throw an error if the organisation does not exist', async () => {
      mockOrganisationsService.deleteOrganisation.mockRejectedValue(
        new Error('Organisation not found'),
      );
      try {
        await controller.deleteOrganisation('non-existing-id');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe('getOrganisationTypes', () => {
    it('should return all organisation types', async () => {
      expect(await controller.getOrganisationTypes({})).toEqual(
        expectedOrganisationTypes,
      );
    });
  });
  describe('getOrganisationTypeById', () => {
    it('should return an organisation type', async () => {
      expect(
        await controller.getOrganisationTypeById(expectedOrganisationType.id),
      ).toEqual(expectedOrganisationType);
    });
    it('should throw an error if the organisation type does not exist', async () => {
      mockOrganisationsService.getOrganisationType.mockRejectedValue(
        new Error('Organisation type not found'),
      );
      try {
        await controller.getOrganisationTypeById('non-existing-id');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe('createOrganisationType', () => {
    it('should create an organisation type', async () => {
      expect(
        await controller.createOrganisationType(expectedOrganisationType),
      ).toEqual(expectedOrganisationType);
    });
  });
  describe('updateOrganisationType', () => {
    it('should update an organisation type', async () => {
      expect(
        await controller.updateOrganisationType(
          expectedOrganisationType.id,
          expectedOrganisationType,
        ),
      ).toEqual(expectedOrganisationType);
    });
    it('should throw an error if the organisation type does not exist', async () => {
      mockOrganisationsService.updateOrganisationType.mockRejectedValue(
        new Error('Organisation type not found'),
      );
      try {
        await controller.updateOrganisationType(
          'non-existing-id',
          expectedOrganisationType,
        );
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe('deleteOrganisationType', () => {
    it('should delete an organisation type', async () => {
      expect(
        await controller.deleteOrganisationType(expectedOrganisationType.id),
      ).toEqual(expectedOrganisationType.id);
    });
    it('should throw an error if the organisation type does not exist', async () => {
      mockOrganisationsService.deleteOrganisationType.mockRejectedValue(
        new Error('Organisation type not found'),
      );
      try {
        await controller.deleteOrganisationType('non-existing-id');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
