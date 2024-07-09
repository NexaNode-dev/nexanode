import { Test, TestingModule } from '@nestjs/testing';
import { JobOffersRepository } from './job-offers.repository';
import { jobOffersFactory } from '@nexanode/testing-data-mocks-utils';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JobOffer } from './job-offer.entity';
import { NotFoundException } from '@nestjs/common';

describe('JobOffersRepository', () => {
  let provider: JobOffersRepository;

  const expectedJobOffers = jobOffersFactory();
  const expectedJobOffer = expectedJobOffers[0];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedJobOffers),
    findOne: jest.fn().mockResolvedValue(expectedJobOffer),
    create: jest.fn().mockReturnValue(expectedJobOffer),
    save: jest.fn().mockResolvedValue(expectedJobOffer),
    preload: jest.fn().mockResolvedValue(expectedJobOffer),
    remove: jest.fn().mockResolvedValue(expectedJobOffer),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobOffersRepository],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(JobOffer)) {
          return mockRepository;
        }
        return;
      })
      .compile();

    provider = module.get<JobOffersRepository>(JobOffersRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('getJobOffers', () => {
    it('should return job offers', async () => {
      const jobOffers = await provider.getJobOffers();
      expect(jobOffers).toEqual(expectedJobOffers);
    });
  });
  describe('getJobOffer', () => {
    it('should return a job offer', async () => {
      const jobOffer = await provider.getJobOffer({
        where: { id: expectedJobOffer.id },
      });
      expect(jobOffer).toEqual(expectedJobOffer);
    });
    it('shouold throw a NotFoundException', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      try {
        await provider.getJobOffer({ where: { id: expectedJobOffer.id } });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('createJobOffer', () => {
    it('should create a job offer', async () => {
      const jobOffer = await provider.createJobOffer(expectedJobOffer);
      expect(jobOffer).toEqual(expectedJobOffer);
    });
  });
  describe('updateJobOffer', () => {
    it('should update a job offer', async () => {
      const jobOffer = await provider.updateJobOffer(
        expectedJobOffer.id,
        expectedJobOffer,
      );
      expect(jobOffer).toEqual(expectedJobOffer);
    });
    it('should throw a NotFoundException', async () => {
      mockRepository.preload.mockResolvedValueOnce(null);
      try {
        await provider.updateJobOffer(expectedJobOffer.id, expectedJobOffer);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('deleteJobOffer', () => {
    it('should delete a job offer', async () => {
      const id = await provider.deleteJobOffer(expectedJobOffer.id);
      expect(id).toEqual(expectedJobOffer.id);
    });
  });
});
