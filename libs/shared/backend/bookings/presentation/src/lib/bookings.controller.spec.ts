import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { bookingsFactory } from '@nexanode/testing-data-mocks-utils';
import { BookingsService } from '@nexanode/backend-bookings-application';

describe('BookingsController', () => {
  let controller: BookingsController;

  const expectedBookings = bookingsFactory();

  const expectedBooking = expectedBookings[0];

  const mockService = {
    getBookings: jest.fn().mockResolvedValue(expectedBookings),
    getBookingById: jest.fn().mockResolvedValue(expectedBooking),
    createBooking: jest.fn().mockResolvedValue(expectedBooking),
    updateBooking: jest.fn().mockResolvedValue(expectedBooking),
    deleteBooking: jest.fn().mockResolvedValue(expectedBooking),
    cancelBooking: jest.fn().mockResolvedValue(expectedBooking),
    initBookingPayment: jest.fn().mockResolvedValue({}),
    confirmBookingPayment: jest.fn().mockResolvedValue(expectedBooking),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
    })
      .useMocker((token) => {
        if (token === BookingsService) {
          return mockService;
        }
        return;
      })
      .compile();

    controller = module.get<BookingsController>(BookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getBookings', () => {
    it('should return an array of bookings', async () => {
      expect(await controller.getBookings()).toEqual(expectedBookings);
    });
  });
  describe('getBooking', () => {
    it('should return a booking', async () => {
      expect(await controller.getBooking(expectedBooking.id)).toEqual(
        expectedBooking,
      );
    });
  });
  describe('createBooking', () => {
    it('should create a booking', async () => {
      expect(await controller.createBooking(expectedBooking)).toEqual(
        expectedBooking,
      );
    });
  });
  describe('updateBooking', () => {
    it('should update a booking', async () => {
      expect(
        await controller.updateBooking(expectedBooking.id, expectedBooking),
      ).toEqual(expectedBooking);
    });
  });
  describe('deleteBooking', () => {
    it('should delete a booking', async () => {
      expect(await controller.deleteBooking(expectedBooking.id)).toEqual(
        expectedBooking,
      );
    });
  });
  describe('cancelBooking', () => {
    it('should cancel a booking', async () => {
      expect(await controller.cancelBooking(expectedBooking.id)).toEqual(
        expectedBooking,
      );
    });
  });
  describe('initBookingPayment', () => {
    it('should initialize a payment', async () => {
      expect(await controller.payBooking(expectedBooking.id)).toEqual({});
    });
  });
  describe('confirmBooking', () => {
    it('should confirm a booking payment', async () => {
      expect(
        await controller.confirmBooking(expectedBooking.id, 'paymentId'),
      ).toEqual(expectedBooking);
    });
  });
});
