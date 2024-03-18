import { TestBed } from '@angular/core/testing';
import { ServicesService } from './services.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ServicesService', () => {
  let service: ServicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicesService]
    });
    service = TestBed.inject(ServicesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});