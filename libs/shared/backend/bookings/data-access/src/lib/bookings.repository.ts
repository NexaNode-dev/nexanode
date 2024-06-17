import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookingsRepository extends Repository<Booking> {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
  ) {
    super(Booking, bookingsRepository.manager, bookingsRepository.queryRunner);
  }

  async findBookings(
    options: FindManyOptions<Booking> = {},
  ): Promise<Booking[]> {
    return this.bookingsRepository.find(options);
  }

  async findBooking(options: FindOneOptions<Booking>): Promise<Booking> {
    const booking = await this.bookingsRepository.findOne(options);
    if (!booking) {
      throw new NotFoundException(
        `Booking with options ${JSON.stringify(options)} not found`,
      );
    }
    return booking;
  }

  async createBooking(booking: Partial<Booking>): Promise<Booking> {
    const newBooking = this.bookingsRepository.create(booking);
    return this.bookingsRepository.save(newBooking);
  }

  async updateBooking(id: string, booking: Partial<Booking>): Promise<Booking> {
    const updatedBooking = await this.bookingsRepository.preload({
      id,
      ...booking,
    });
    if (!updatedBooking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
    return this.bookingsRepository.save(updatedBooking);
  }

  async deleteBooking(id: string): Promise<Booking> {
    const booking = await this.findBooking({ where: { id } });
    return this.bookingsRepository.remove(booking);
  }
}
