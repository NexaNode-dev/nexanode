import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { BookingsService } from './bookings.service';
import { provideHttpClient } from '@angular/common/http';
import { bookingsFactory } from '@nexanode/testing-data-mocks-utils';

describe('BookingsService', () => {
  let service: BookingsService;
  let httpController: HttpTestingController;

  const expectedBookings = bookingsFactory();
  const expectedBooking = expectedBookings[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BookingsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getBookings', () => {
    it('should get bookings', () => {
      service.getBookings().subscribe((bookings) => {
        expect(bookings).toEqual(expectedBookings);
      });
      const req = httpController.expectOne('/api/bookings');
      expect(req.request.method).toBe('GET');
      req.flush(expectedBookings);
    });
  });
  describe('getBooking', () => {
    it('should get booking', () => {
      service.getBooking(expectedBooking.id).subscribe((booking) => {
        expect(booking).toEqual(expectedBooking);
      });
      const req = httpController.expectOne(
        `/api/bookings/${expectedBooking.id}`,
      );
      expect(req.request.method).toBe('GET');
      req.flush(expectedBooking);
    });
  });
  describe('createBooking', () => {
    it('should create booking', () => {
      service.createBooking(expectedBooking).subscribe((booking) => {
        expect(booking).toEqual(expectedBooking);
      });
      const req = httpController.expectOne('/api/bookings');
      expect(req.request.method).toBe('POST');
      req.flush(expectedBooking);
    });
  });
  describe('updateBooking', () => {
    it('should update booking', () => {
      service
        .updateBooking(expectedBooking.id, expectedBooking)
        .subscribe((booking) => {
          expect(booking).toEqual(expectedBooking);
        });
      const req = httpController.expectOne(
        `/api/bookings/${expectedBooking.id}`,
      );
      expect(req.request.method).toBe('PATCH');
      req.flush(expectedBooking);
    });
  });
  describe('deleteBooking', () => {
    it('should delete booking', () => {
      service.deleteBooking(expectedBooking.id).subscribe();
      const req = httpController.expectOne(
        `/api/bookings/${expectedBooking.id}`,
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
  describe('payBooking', () => {
    it('should pay booking', () => {
      service.payBooking(expectedBooking.id).subscribe();
      const req = httpController.expectOne(
        `/api/bookings/${expectedBooking.id}/pay`,
      );
      expect(req.request.method).toBe('POST');
      req.flush(null);
    });
  });
  describe('cancelBooking', () => {
    it('should cancel booking', () => {
      service.cancelBooking(expectedBooking.id).subscribe((booking) => {
        expect(booking).toEqual(expectedBooking);
      });
      const req = httpController.expectOne(
        `/api/bookings/${expectedBooking.id}/cancel`,
      );
      expect(req.request.method).toBe('POST');
      req.flush(expectedBooking);
    });
  });
  describe('confirmBooking', () => {
    it('should confirm booking', () => {
      service
        .confirmBooking(expectedBooking.id, 'paymentId')
        .subscribe((booking) => {
          expect(booking).toEqual(expectedBooking);
        });
      const req = httpController.expectOne(
        `/api/bookings/${expectedBooking.id}/confirm/paymentId`,
      );
      expect(req.request.method).toBe('POST');
      req.flush(expectedBooking);
    });
  });
});
