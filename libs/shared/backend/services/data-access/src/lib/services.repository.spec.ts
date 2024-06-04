import { Test, TestingModule } from '@nestjs/testing';
import { ServicesRepository } from './services.repository';
import { servicesFactory } from '@nexanode/testing-data-mocks-utils';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { NotFoundException } from '@nestjs/common';

describe('ServicesRepository', () => {
  let provider: ServicesRepository;

  const expectedServices = servicesFactory();

  const expectedService = expectedServices[0];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedServices),
    findOne: jest.fn().mockResolvedValue(expectedService),
    create: jest.fn().mockReturnValue(expectedService),
    save: jest.fn().mockResolvedValue(expectedService),
    preload: jest.fn().mockResolvedValue(expectedService),
    remove: jest.fn().mockResolvedValue(expectedService),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicesRepository],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(Service)) {
          return mockRepository;
        }
        return;
      })
      .compile();

    provider = module.get<ServicesRepository>(ServicesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('getServices', () => {
    it('should return all services', async () => {
      expect(await provider.getServices()).toEqual(expectedServices);
    });
  });
  describe('getService', () => {
    it('should return a service', async () => {
      expect(
        await provider.getService({ where: { id: expectedService.id } }),
      ).toEqual(expectedService);
    });
    it('should throw NotFoundException if service not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(undefined);
      try {
        await provider.getService({ where: { id: expectedService.id } });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('createService', () => {
    it('should create a service', async () => {
      expect(await provider.createService(expectedService)).toEqual(
        expectedService,
      );
    });
  });
  describe('updateService', () => {
    it('should update a service', async () => {
      expect(
        await provider.updateService(expectedService.id, expectedService),
      ).toEqual(expectedService);
    });
    it('should throw NotFoundException if service not found', async () => {
      mockRepository.preload.mockResolvedValueOnce(undefined);
      try {
        await provider.updateService(expectedService.id, expectedService);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('deleteService', () => {
    it('should delete a service', async () => {
      expect(await provider.deleteService(expectedService.id)).toEqual(
        expectedService.id,
      );
    });
    it('should throw NotFoundException if service not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(undefined);
      try {
        await provider.deleteService(expectedService.id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
