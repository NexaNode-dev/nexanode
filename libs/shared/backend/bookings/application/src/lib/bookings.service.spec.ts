import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import {
  bookingsFactory,
  eventFactory,
} from '@nexanode/testing-data-mocks-utils';
import { BookingsRepository } from '@nexanode/backend-bookings-data-access';
import { EventsRepository } from '@nexanode/backend-events-data-access';
import { PaymentsService } from '@nexanode/backend-payments-util';

describe('BookingsService', () => {
  let service: BookingsService;

  const mockEvent = eventFactory();

  const expectedBookings = bookingsFactory(5, [{ eventId: mockEvent.id }]);

  const expectedBooking = expectedBookings[0];

  const mockBookingsRepository = {
    findBookings: jest.fn().mockResolvedValue(expectedBookings),
    findBooking: jest.fn().mockResolvedValue(expectedBooking),
    createBooking: jest.fn().mockReturnValue(expectedBooking),
    updateBooking: jest.fn().mockResolvedValue(expectedBooking),
    deleteBooking: jest.fn().mockResolvedValue(expectedBooking),
  };

  const mockEventsRepository = {
    getEvent: jest.fn().mockResolvedValue(mockEvent),
  };

  const mockPaymentsService = {
    initializePayment: jest.fn().mockResolvedValue({}),
    confirmPayment: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingsService],
    })
      .useMocker((token) => {
        if (token === BookingsRepository) {
          return mockBookingsRepository;
        }
        if (token === EventsRepository) {
          return mockEventsRepository;
        }
        if (token === PaymentsService) {
          return mockPaymentsService;
        }
        return;
      })
      .compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getBookings', () => {
    it('should return bookings', async () => {
      const bookings = await service.getBookings({});
      expect(bookings).toEqual(expectedBookings);
    });
  });
  describe('getBooking', () => {
    it('should return booking', async () => {
      const booking = await service.getBooking({});
      expect(booking).toEqual(expectedBooking);
    });
  });
  describe('getBookingById', () => {
    it('should return booking', async () => {
      const booking = await service.getBookingById(expectedBooking.id);
      expect(booking).toEqual(expectedBooking);
    });
  });
  describe('createBooking', () => {
    it('should return booking', async () => {
      const booking = await service.createBooking({});
      expect(booking).toEqual(expectedBooking);
    });
  });
  describe('updateBooking', () => {
    it('should return booking', async () => {
      const booking = await service.updateBooking(expectedBooking.id, {});
      expect(booking).toEqual(expectedBooking);
    });
  });
  describe('deleteBooking', () => {
    it('should return booking', async () => {
      const booking = await service.deleteBooking(expectedBooking.id);
      expect(booking).toEqual(expectedBooking);
    });
  });
  describe('cancelBooking', () => {
    it('should return booking', async () => {
      const booking = await service.cancelBooking(expectedBooking.id);
      expect(booking).toEqual(expectedBooking);
    });
  });
  describe('initBookingPayment', () => {
    it('should return payment', async () => {
      if (!mockEvent.price) {
        mockEvent.price = 100;
      }
      const payment = await service.initBookingPayment(expectedBooking.id);
      expect(payment).toBeDefined();
    });
  });
  describe('confirmBookingPayment', () => {
    it('should return booking', async () => {
      const booking = await service.confirmBookingPayment(
        expectedBooking.id,
        'paymentId',
      );
      expect(booking).toEqual(expectedBooking);
    });
  });
});
