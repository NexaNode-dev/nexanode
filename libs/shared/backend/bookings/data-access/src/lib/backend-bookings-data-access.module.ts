import { Module } from '@nestjs/common';
import { BookingsRepository } from './bookings.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  providers: [BookingsRepository],
  exports: [BookingsRepository, TypeOrmModule],
})
export class BackendBookingsDataAccessModule {}
