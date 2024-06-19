import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BackendBookingsDataAccessModule } from '@nexanode/backend-bookings-data-access';
import { BackendPaymentsUtilModule } from '@nexanode/backend-payments-util';

@Module({
  imports: [
    BackendBookingsDataAccessModule,
    BackendPaymentsUtilModule.register({
      paymentProvider: process.env['PAYMENT_PROVIDER'] || 'mollie',
      paymentApiKey: process.env['PAYMENT_API_KEY'] || 'test_',
    }),
  ],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BackendBookingsApplicationModule {}
