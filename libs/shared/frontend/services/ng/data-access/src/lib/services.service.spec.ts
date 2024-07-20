import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ServicesService } from './services.service';
import {
  categoriesFactory,
  servicesFactory,
} from '@nexanode/testing-data-mocks-utils';

describe('ServicesService', () => {
  let service: ServicesService;

  let httpController: HttpTestingController;

  const expectedServices = servicesFactory();

  const expectedService = expectedServices[0];

  const expectedCategories = categoriesFactory();

  const expectedCategory = expectedCategories[0];

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

      const req = httpController.expectOne('/api/services');
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
        `/api/services/${expectedService.id}`,
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

      const req = httpController.expectOne('/api/services');
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
        `/api/services/${expectedService.id}`,
      );
      expect(req.request.method).toEqual('PATCH');
      req.flush(expectedService);
    });
  });
  describe('deleteService', () => {
    it('should delete a service', () => {
      service.deleteService(expectedService.id).subscribe();

      const req = httpController.expectOne(
        `/api/services/${expectedService.id}`,
      );
      expect(req.request.method).toEqual('DELETE');
      req.flush(null);
    });
  });
  describe('getServicesByCategory', () => {
    it('should return expected services', () => {
      service
        .getServicesByCategory(expectedCategory.id)
        .subscribe((services) => {
          expect(services).toEqual(expectedServices);
        });

      const req = httpController.expectOne(
        `/api/services/category/${expectedCategory.id}`,
      );
      expect(req.request.method).toEqual('GET');
      req.flush(expectedServices);
    });
  });
  describe('getCategories', () => {
    it('should return expected categories', () => {
      service.getCategories().subscribe((categories) => {
        expect(categories).toEqual(expectedCategories);
      });

      const req = httpController.expectOne('/api/services/categories');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedCategories);
    });
  });
  describe('getCategory', () => {
    it('should return expected category', () => {
      service.getCategory(expectedCategory.id).subscribe((category) => {
        expect(category).toEqual(expectedCategory);
      });

      const req = httpController.expectOne(
        `/api/services/categories/${expectedCategory.id}`,
      );
      expect(req.request.method).toEqual('GET');
      req.flush(expectedCategory);
    });
  });
  describe('createCategory', () => {
    it('should create a category', () => {
      service.createCategory(expectedCategory).subscribe((category) => {
        expect(category).toEqual(expectedCategory);
      });

      const req = httpController.expectOne('/api/services/categories');
      expect(req.request.method).toEqual('POST');
      req.flush(expectedCategory);
    });
  });
  describe('updateCategory', () => {
    it('should update a category', () => {
      service.updateCategory(expectedCategory).subscribe((category) => {
        expect(category).toEqual(expectedCategory);
      });

      const req = httpController.expectOne(
        `/api/services/categories/${expectedCategory.id}`,
      );
      expect(req.request.method).toEqual('PATCH');
      req.flush(expectedCategory);
    });
  });
  describe('deleteCategory', () => {
    it('should delete a category', () => {
      service.deleteCategory(expectedCategory.id).subscribe();

      const req = httpController.expectOne(
        `/api/services/categories/${expectedCategory.id}`,
      );
      expect(req.request.method).toEqual('DELETE');
      req.flush(null);
    });
  });
});
