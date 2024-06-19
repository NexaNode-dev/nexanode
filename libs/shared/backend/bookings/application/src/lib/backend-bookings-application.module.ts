import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BackendBookingsDataAccessModule } from '@nexanode/backend-bookings-data-access';
import { BackendPaymentsUtilModule } from '@nexanode/backend-payments-util';

@Module({
  imports: [
    BackendBookingsDataAccessModule,
    BackendPaymentsUtilModule.register({
      paymentProvider: process.env['PAYMENT_PROVIDER'] || 'mollie',
    }),
  ],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BackendBookingsApplicationModule {}
