import { Payment } from '@mollie/api-client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingsRepository } from '@nexanode/backend-bookings-data-access';
import { EventsRepository } from '@nexanode/backend-events-data-access';
import { PaymentsService } from '@nexanode/backend-payments-util';
import {
  QueryParamsDto,
  transformQueryParamsToFindOptions,
} from '@nexanode/backend-query-params-util';
import { IBooking } from '@nexanode/domain-interfaces';

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingsRepository: BookingsRepository,
    private readonly eventsRepository: EventsRepository,
    private readonly paymentsService: PaymentsService,
  ) {}

  async getBookings(
    queryParams: QueryParamsDto<IBooking>,
  ): Promise<IBooking[]> {
    const options = transformQueryParamsToFindOptions(queryParams);
    return this.bookingsRepository.findBookings(options);
  }

  async getBooking(queryParams: QueryParamsDto<IBooking>): Promise<IBooking> {
    const options = transformQueryParamsToFindOptions(queryParams);
    return this.bookingsRepository.findBooking(options);
  }

  async getBookingById(id: string): Promise<IBooking> {
    return this.bookingsRepository.findBooking({ where: { id } });
  }

  async createBooking(booking: Partial<IBooking>): Promise<IBooking> {
    return this.bookingsRepository.createBooking(booking);
  }

  async updateBooking(
    id: string,
    booking: Partial<IBooking>,
  ): Promise<IBooking> {
    return this.bookingsRepository.updateBooking(id, booking);
  }

  async deleteBooking(id: string): Promise<IBooking> {
    return this.bookingsRepository.deleteBooking(id);
  }

  async cancelBooking(id: string): Promise<IBooking> {
    return this.bookingsRepository.updateBooking(id, { status: 'cancelled' });
  }

  async initBookingPayment(id: string): Promise<Payment> {
    const booking = await this.bookingsRepository.findBooking({
      where: { id },
    });
    const event = await this.eventsRepository.getEvent({
      where: { id: booking.eventId },
    });
    if (!event.price) {
      throw new BadRequestException('Event is free');
    }
    const payment = await this.paymentsService.initializePayment({
      amount: event.price,
      description: `Booking for ${event.name} ${event.from}`,
    });

    return payment;
  }

  async confirmBookingPayment(
    id: string,
    paymentId: string,
  ): Promise<IBooking> {
    const booking = await this.bookingsRepository.findBooking({
      where: { id },
    });
    const payment = await this.paymentsService.confirmPayment(paymentId);

    if (payment.status === 'paid') {
      return this.bookingsRepository.updateBooking(id, { status: 'confirmed' });
    }

    return booking;
  }
}
