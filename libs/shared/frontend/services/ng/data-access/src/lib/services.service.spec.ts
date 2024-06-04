import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ServicesService } from './services.service';
import { servicesFactory } from '@nexanode/testing-data-mocks-utils';

describe('ServicesService', () => {
  let service: ServicesService;

  let httpController: HttpTestingController;

  const expectedServices = servicesFactory();

  const expectedService = expectedServices[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ServicesService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getServices', () => {
    it('should return expected services', () => {
      service.getServices().subscribe((services) => {
        expect(services).toEqual(expectedServices);
      });

      const req = httpController.expectOne('api/services');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedServices);
    });
  });
  describe('getService', () => {
    it('should return expected service', () => {
      service.getService(expectedService.id).subscribe((service) => {
        expect(service).toEqual(expectedService);
      });

      const req = httpController.expectOne(
        `api/services/${expectedService.id}`,
      );
      expect(req.request.method).toEqual('GET');
      req.flush(expectedService);
    });
  });
  describe('createService', () => {
    it('should create a service', () => {
      service.createService(expectedService).subscribe((service) => {
        expect(service).toEqual(expectedService);
      });

      const req = httpController.expectOne('api/services');
      expect(req.request.method).toEqual('POST');
      req.flush(expectedService);
    });
  });
  describe('updateService', () => {
    it('should update a service', () => {
      service.updateService(expectedService).subscribe((service) => {
        expect(service).toEqual(expectedService);
      });

      const req = httpController.expectOne(
        `api/services/${expectedService.id}`,
      );
      expect(req.request.method).toEqual('PUT');
      req.flush(expectedService);
    });
  });
  describe('deleteService', () => {
    it('should delete a service', () => {
      service.deleteService(expectedService.id).subscribe();

      const req = httpController.expectOne(
        `api/services/${expectedService.id}`,
      );
      expect(req.request.method).toEqual('DELETE');
      req.flush(null);
    });
  });
});
