import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { JobOffersService } from './job-offers.service';
import { jobOffersFactory } from '@nexanode/testing-data-mocks-utils';
import { provideHttpClient } from '@angular/common/http';

describe('JobOffersService', () => {
  let service: JobOffersService;
  let httpController: HttpTestingController;

  const expectedJobOffers = jobOffersFactory();
  const expectedJobOffer = expectedJobOffers[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JobOffersService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(JobOffersService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getJobOffers', () => {
    it('should get job offers', () => {
      service.getJobOffers().subscribe((jobOffers) => {
        expect(jobOffers).toEqual(expectedJobOffers);
      });
      const req = httpController.expectOne('api/job-offers');
      expect(req.request.method).toBe('GET');
      req.flush(expectedJobOffers);
    });
  });
  describe('getJobOffer', () => {
    it('should get job offer', () => {
      service.getJobOffer(expectedJobOffer.id).subscribe((jobOffer) => {
        expect(jobOffer).toEqual(expectedJobOffer);
      });
      const req = httpController.expectOne(
        `api/job-offers/${expectedJobOffer.id}`,
      );
      expect(req.request.method).toBe('GET');
      req.flush(expectedJobOffer);
    });
  });
  describe('createJobOffer', () => {
    it('should create job offer', () => {
      service.createJobOffer(expectedJobOffer).subscribe((jobOffer) => {
        expect(jobOffer).toEqual(expectedJobOffer);
      });
      const req = httpController.expectOne('api/job-offers');
      expect(req.request.method).toBe('POST');
      req.flush(expectedJobOffer);
    });
  });
  describe('updateJobOffer', () => {
    it('should update job offer', () => {
      service
        .updateJobOffer(expectedJobOffer.id, expectedJobOffer)
        .subscribe((jobOffer) => {
          expect(jobOffer).toEqual(expectedJobOffer);
        });
      const req = httpController.expectOne(
        `api/job-offers/${expectedJobOffer.id}`,
      );
      expect(req.request.method).toBe('PUT');
      req.flush(expectedJobOffer);
    });
  });
  describe('deleteJobOffer', () => {
    it('should delete job offer', () => {
      service.deleteJobOffer(expectedJobOffer.id).subscribe((id) => {
        expect(id).toEqual(expectedJobOffer.id);
      });
      const req = httpController.expectOne(
        `api/job-offers/${expectedJobOffer.id}`,
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(expectedJobOffer.id);
    });
  });
});
