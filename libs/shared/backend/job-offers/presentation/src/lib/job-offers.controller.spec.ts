import { Test, TestingModule } from '@nestjs/testing';
import { JobOffersController } from './job-offers.controller';
import { jobOffersFactory } from '@nexanode/testing-data-mocks-utils';
import { JobOffersService } from '@nexanode/backend-job-offers-application';

describe('JobOffersController', () => {
  let controller: JobOffersController;

  const expectedJobOffers = jobOffersFactory();
  const expectedJobOffer = expectedJobOffers[0];

  const mockService = {
    getJobOffers: jest.fn().mockResolvedValue(expectedJobOffers),
    getJobOfferById: jest.fn().mockResolvedValue(expectedJobOffer),
    createJobOffer: jest.fn().mockResolvedValue(expectedJobOffer),
    updateJobOffer: jest.fn().mockResolvedValue(expectedJobOffer),
    deleteJobOffer: jest.fn().mockResolvedValue(expectedJobOffer.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobOffersController],
      providers: [{ provide: JobOffersService, useValue: mockService }],
    }).compile();

    controller = module.get<JobOffersController>(JobOffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getJobOffers', () => {
    it('should return an array of job offers', async () => {
      expect(await controller.getJobOffers({})).toEqual(expectedJobOffers);
    });
  });
  describe('getJobOfferById', () => {
    it('should return a job offer', async () => {
      expect(await controller.getJobOfferById(expectedJobOffer.id)).toEqual(
        expectedJobOffer,
      );
    });
  });
  describe('createJobOffer', () => {
    it('should return a job offer', async () => {
      expect(await controller.createJobOffer(expectedJobOffer)).toEqual(
        expectedJobOffer,
      );
    });
  });
  describe('updateJobOffer', () => {
    it('should return a job offer', async () => {
      expect(
        await controller.updateJobOffer(expectedJobOffer.id, expectedJobOffer),
      ).toEqual(expectedJobOffer);
    });
  });
  describe('deleteJobOffer', () => {
    it('should return a job offer id', async () => {
      expect(await controller.deleteJobOffer(expectedJobOffer.id)).toEqual(
        expectedJobOffer.id,
      );
    });
  });
});
