import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { servicesFactory } from '@nexanode/testing-data-mocks-utils';
import { ServicesRepository } from '@nexanode/backend-services-data-access';

describe('ServicesService', () => {
  let service: ServicesService;

  const expectedServices = servicesFactory();

  const expectedService = expectedServices[0];

  const mockRepository = {
    getServices: jest.fn().mockResolvedValue(expectedServices),
    getService: jest.fn().mockResolvedValue(expectedService),
    createService: jest.fn().mockResolvedValue(expectedService),
    updateService: jest.fn().mockResolvedValue(expectedService),
    deleteService: jest.fn().mockResolvedValue(expectedService.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicesService],
    })
      .useMocker((token) => {
        if (token === ServicesRepository) {
          return mockRepository;
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
});
