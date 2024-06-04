import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import { servicesFactory } from '@nexanode/testing-data-mocks-utils';
import { ServicesService } from '@nexanode/backend-services-application';
import { CreateServiceDto } from './dtos/create-service.dto';
import { UpdateServiceDto } from './dtos/update-service.dto';
import { randomInt } from 'crypto';

describe('ServicesController', () => {
  let controller: ServicesController;

  const expectedServices = servicesFactory();

  const expectedService = expectedServices[0];

  const createServiceDto: CreateServiceDto = {
    name: expectedService.name,
    description: expectedService.description || '',
    summary: expectedService.summary,
    price: expectedService.price,
    category: expectedService.category,
  };

  const updateServiceDto: UpdateServiceDto = {
    price: expectedService.price || 1 * randomInt(10),
  };

  const mockServicesService = {
    getServices: jest.fn().mockResolvedValue(expectedServices),
    getService: jest.fn().mockResolvedValue(expectedService),
    createService: jest.fn().mockResolvedValue(expectedService),
    updateService: jest.fn().mockResolvedValue(expectedService),
    deleteService: jest.fn().mockResolvedValue(expectedService.id),
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
      expect(await controller.remove(expectedService.id)).toEqual(
        expectedService.id,
      );
    });
  });
});
