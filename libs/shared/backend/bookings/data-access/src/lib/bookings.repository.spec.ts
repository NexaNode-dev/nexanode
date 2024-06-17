import { Test, TestingModule } from '@nestjs/testing';
import { BookingsRepository } from './bookings.repository';
import { bookingsFactory } from '@nexanode/testing-data-mocks-utils';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { NotFoundException } from '@nestjs/common';

describe('BookingsRepository', () => {
  let provider: BookingsRepository;

  const expectedBookings = bookingsFactory();

  const expectedBooking = expectedBookings[0];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedBookings),
    findOne: jest.fn().mockResolvedValue(expectedBooking),
    create: jest.fn().mockReturnValue(expectedBooking),
    save: jest.fn().mockResolvedValue(expectedBooking),
    preload: jest.fn().mockResolvedValue(expectedBooking),
    remove: jest.fn().mockResolvedValue(expectedBooking),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingsRepository],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(Booking)) {
          return mockRepository;
        }
        return;
      })
      .compile();

    provider = module.get<BookingsRepository>(BookingsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('findBookings', () => {
    it('should return an array of bookings', async () => {
      expect(await provider.findBookings()).toEqual(expectedBookings);
    });
  });
  describe('findBooking', () => {
    it('should return a booking', async () => {
      expect(await provider.findBooking({})).toEqual(expectedBooking);
    });
    it('should throw a NotFoundException', async () => {
      mockRepository.findOne.mockResolvedValueOnce(undefined);
      try {
        await provider.findBooking({});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('createBooking', () => {
    it('should return a booking', async () => {
      expect(await provider.createBooking({})).toEqual(expectedBooking);
    });
  });
  describe('updateBooking', () => {
    it('should return a booking', async () => {
      expect(await provider.updateBooking('', {})).toEqual(expectedBooking);
    });
    it('should throw a NotFoundException', async () => {
      mockRepository.preload.mockResolvedValueOnce(undefined);
      try {
        await provider.updateBooking('', {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('deleteBooking', () => {
    it('should return a booking', async () => {
      expect(await provider.deleteBooking(expectedBooking.id)).toEqual(
        expectedBooking,
      );
    });
  });
});
