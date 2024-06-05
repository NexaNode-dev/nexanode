import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import {
  categoriesFactory,
  servicesFactory,
} from '@nexanode/testing-data-mocks-utils';
import { ServicesRepository } from '@nexanode/backend-services-data-access';
import { CategoriesRepository } from '@nexanode/backend-categories-data-access';

describe('ServicesService', () => {
  let service: ServicesService;

  const expectedServices = servicesFactory();

  const expectedService = expectedServices[0];

  const expectedCategories = categoriesFactory();

  const expectedCategory = expectedCategories[0];

  const mockServicesRepository = {
    getServices: jest.fn().mockResolvedValue(expectedServices),
    getService: jest.fn().mockResolvedValue(expectedService),
    createService: jest.fn().mockResolvedValue(expectedService),
    updateService: jest.fn().mockResolvedValue(expectedService),
    deleteService: jest.fn().mockResolvedValue(expectedService.id),
  };

  const mockCategoriesRepository = {
    getCategories: jest.fn().mockResolvedValue(expectedCategories),
    getCategory: jest.fn().mockResolvedValue(expectedCategory),
    createCategory: jest.fn().mockResolvedValue(expectedCategory),
    updateCategory: jest.fn().mockResolvedValue(expectedCategory),
    deleteCategory: jest.fn().mockResolvedValue(expectedCategory.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicesService],
    })
      .useMocker((token) => {
        if (token === ServicesRepository) {
          return mockServicesRepository;
        }
        if (token === CategoriesRepository) {
          return mockCategoriesRepository;
        }
        return;
      })
      .compile();

    service = module.get<ServicesService>(ServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getServices', () => {
    it('should return all services', async () => {
      const services = await service.getServices();
      expect(services).toEqual(expectedServices);
    });
  });
  describe('getService', () => {
    it('should return a service', async () => {
      const result = await service.getService({
        where: { id: expectedService.id },
      });
      expect(result).toEqual(expectedService);
    });
  });
  describe('getServiceById', () => {
    it('should return a service by id', async () => {
      const result = await service.getServiceById(expectedService.id);
      expect(result).toEqual(expectedService);
    });
  });
  describe('createService', () => {
    it('should create a service', async () => {
      const result = await service.createService(expectedService);
      expect(result).toEqual(expectedService);
    });
  });
  describe('updateService', () => {
    it('should update a service', async () => {
      const result = await service.updateService(
        expectedService.id,
        expectedService,
      );
      expect(result).toEqual(expectedService);
    });
  });
  describe('deleteService', () => {
    it('should delete a service', async () => {
      const result = await service.deleteService(expectedService.id);
      expect(result).toEqual(expectedService.id);
    });
  });
  describe('getServicesByCategory', () => {
    it('should return services by category', async () => {
      const result = await service.getServicesByCategory(expectedCategory.id);
      expect(result).toEqual(expectedServices);
    });
  });
  describe('getCategories', () => {
    it('should return all categories', async () => {
      const result = await service.getCategories();
      expect(result).toEqual(expectedCategories);
    });
  });
  describe('getCategory', () => {
    it('should return a category', async () => {
      const result = await service.getCategory({
        where: { id: expectedCategory.id },
      });
      expect(result).toEqual(expectedCategory);
    });
  });
  describe('getCategoryById', () => {
    it('should return a category by id', async () => {
      const result = await service.getCategoryById(expectedCategory.id);
      expect(result).toEqual(expectedCategory);
    });
  });
  describe('createCategory', () => {
    it('should create a category', async () => {
      const result = await service.createCategory(expectedCategory);
      expect(result).toEqual(expectedCategory);
    });
  });
  describe('updateCategory', () => {
    it('should update a category', async () => {
      const result = await service.updateCategory(
        expectedCategory.id,
        expectedCategory,
      );
      expect(result).toEqual(expectedCategory);
    });
  });
  describe('deleteCategory', () => {
    it('should delete a category', async () => {
      const result = await service.deleteCategory(expectedCategory.id);
      expect(result).toEqual(expectedCategory.id);
    });
  });
});
