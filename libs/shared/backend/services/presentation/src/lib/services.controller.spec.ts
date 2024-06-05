import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import {
  categoriesFactory,
  servicesFactory,
} from '@nexanode/testing-data-mocks-utils';
import { ServicesService } from '@nexanode/backend-services-application';
import { CreateServiceDto } from './dtos/create-service.dto';
import { UpdateServiceDto } from './dtos/update-service.dto';
import { randomInt } from 'crypto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

describe('ServicesController', () => {
  let controller: ServicesController;

  const expectedServices = servicesFactory();

  const expectedService = expectedServices[0];

  const expectedCategories = categoriesFactory();

  const expectedCategory = expectedCategories[0];

  const createServiceDto: CreateServiceDto = {
    name: expectedService.name,
    description: expectedService.description || '',
    summary: expectedService.summary,
    price: expectedService.price,
    categoryId: expectedService.categoryId,
  };

  const updateServiceDto: UpdateServiceDto = {
    price: expectedService.price || 1 * randomInt(10),
  };

  const createCategoryDto: CreateCategoryDto = {
    name: expectedCategory.name,
    description: expectedCategory.description || '',
  };

  const updateCategoryDto: UpdateCategoryDto = {
    description: `expectedCategory.description || ''${'updated'}`,
  };

  const mockServicesService = {
    getServices: jest.fn().mockResolvedValue(expectedServices),
    getService: jest.fn().mockResolvedValue(expectedService),
    createService: jest.fn().mockResolvedValue(expectedService),
    updateService: jest.fn().mockResolvedValue(expectedService),
    deleteService: jest.fn().mockResolvedValue(expectedService.id),
    getServicesByCategory: jest.fn().mockResolvedValue(expectedServices),
    getCategories: jest.fn().mockResolvedValue(expectedCategories),
    getCategoryById: jest.fn().mockResolvedValue(expectedCategory),
    createCategory: jest.fn().mockResolvedValue(expectedCategory),
    updateCategory: jest.fn().mockResolvedValue(expectedCategory),
    deleteCategory: jest.fn().mockResolvedValue(expectedCategory.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
    })
      .useMocker((token) => {
        if (token === ServicesService) {
          return mockServicesService;
        }
        return;
      })
      .compile();

    controller = module.get<ServicesController>(ServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of services', async () => {
      expect(await controller.findAll({} as never)).toEqual(expectedServices);
    });
  });
  describe('findOneById', () => {
    it('should return a service', async () => {
      expect(await controller.findOneById(expectedService.id)).toEqual(
        expectedService,
      );
    });
  });
  describe('create', () => {
    it('should return a service', async () => {
      expect(await controller.create(createServiceDto)).toEqual(
        expectedService,
      );
    });
  });
  describe('update', () => {
    it('should return a service', async () => {
      expect(
        await controller.update(expectedService.id, updateServiceDto),
      ).toEqual(expectedService);
    });
  });
  describe('remove', () => {
    it('should return a string', async () => {
      expect(await controller.delete(expectedService.id)).toEqual(
        expectedService.id,
      );
    });
  });
  describe('findByCategory', () => {
    it('should return an array of services', async () => {
      expect(await controller.findByCategory(expectedCategory.id)).toEqual(
        expectedServices,
      );
    });
  });
  describe('getCategories', () => {
    it('should return an array of categories', async () => {
      expect(await controller.getCategories()).toEqual(expectedCategories);
    });
  });
  describe('getCategory', () => {
    it('should return a category', async () => {
      expect(await controller.getCategory(expectedCategory.id)).toEqual(
        expectedCategory,
      );
    });
  });
  describe('createCategory', () => {
    it('should return a category', async () => {
      expect(await controller.createCategory(createCategoryDto)).toEqual(
        expectedCategory,
      );
    });
  });
  describe('updateCategory', () => {
    it('should return a category', async () => {
      expect(
        await controller.updateCategory(expectedCategory.id, updateCategoryDto),
      ).toEqual(expectedCategory);
    });
  });
  describe('deleteCategory', () => {
    it('should return a string', async () => {
      expect(await controller.deleteCategory(expectedCategory.id)).toEqual(
        expectedCategory.id,
      );
    });
  });
});
