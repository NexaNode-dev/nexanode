import { Test, TestingModule } from '@nestjs/testing';
import { JobOffersService } from './job-offers.service';
import { jobOffersFactory } from '@nexanode/testing-data-mocks-utils';
import { JobOffersRepository } from '@nexanode/backend-job-offers-data-access ';

describe('JobOffersService', () => {
  let service: JobOffersService;

  const expectedJobOffers = jobOffersFactory();
  const expectedJobOffer = expectedJobOffers[0];

  const mockRepository = {
    getJobOffers: jest.fn().mockResolvedValue(expectedJobOffers),
    getJobOffer: jest.fn().mockResolvedValue(expectedJobOffer),
    getJobOfferById: jest.fn().mockResolvedValue(expectedJobOffer),
    createJobOffer: jest.fn().mockResolvedValue(expectedJobOffer),
    updateJobOffer: jest.fn().mockResolvedValue(expectedJobOffer),
    deleteJobOffer: jest.fn().mockResolvedValue(expectedJobOffer.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobOffersService,
        { provide: JobOffersRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<JobOffersService>(JobOffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getJobOffers', () => {
    it('should return job offers', async () => {
      const result = await service.getJobOffers({});
      expect(result).toEqual(expectedJobOffers);
    });
  });
  describe('getJobOffer', () => {
    it('should return job offer', async () => {
      const result = await service.getJobOffer({});
      expect(result).toEqual(expectedJobOffer);
    });
  });
  describe('getJobOfferById', () => {
    it('should return job offer', async () => {
      const result = await service.getJobOfferById(expectedJobOffer.id);
      expect(result).toEqual(expectedJobOffer);
    });
  });
  describe('createJobOffer', () => {
    it('should return job offer', async () => {
      const result = await service.createJobOffer(expectedJobOffer);
      expect(result).toEqual(expectedJobOffer);
    });
  });
  describe('updateJobOffer', () => {
    it('should return job offer', async () => {
      const result = await service.updateJobOffer(
        expectedJobOffer.id,
        expectedJobOffer,
      );
      expect(result).toEqual(expectedJobOffer);
    });
  });
  describe('deleteJobOffer', () => {
    it('should return job offer id', async () => {
      const result = await service.deleteJobOffer(expectedJobOffer.id);
      expect(result).toEqual(expectedJobOffer.id);
    });
  });
});
