import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BackendBookingsApplicationModule } from '@nexanode/backend-bookings-application';

@Module({
  imports: [BackendBookingsApplicationModule],
  controllers: [BookingsController],
  providers: [],
  exports: [],
})
export class BackendBookingsPresentationModule {}
