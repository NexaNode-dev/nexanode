import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookingsService } from '@nexanode/backend-bookings-application';
import { QueryParamsDto } from '@nexanode/backend-query-params-util';
import { Rbac } from '@nexanode/backend-rbac-util';
import { IBooking } from '@nexanode/domain-interfaces';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';
import { Payment } from '@mollie/api-client';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Rbac({ action: 'read', subject: 'Booking' })
  @Get()
  async getBookings(
    queryParams: QueryParamsDto<IBooking> = {},
  ): Promise<IBooking[]> {
    return this.bookingsService.getBookings(queryParams);
  }

  @Rbac({ action: 'read', subject: 'Booking' })
  @Get(':id')
  async getBooking(@Param('id') id: string): Promise<IBooking> {
    return this.bookingsService.getBookingById(id);
  }

  @Rbac({ action: 'create', subject: 'Booking' })
  @Post()
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<IBooking> {
    return this.bookingsService.createBooking(createBookingDto);
  }

  @Rbac({ action: 'update', subject: 'Booking' })
  @Patch(':id')
  async updateBooking(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ): Promise<IBooking> {
    return this.bookingsService.updateBooking(id, updateBookingDto);
  }

  @Rbac({ action: 'delete', subject: 'Booking' })
  @Delete(':id')
  async deleteBooking(@Param('id') id: string): Promise<IBooking> {
    return this.bookingsService.deleteBooking(id);
  }

  @Rbac({ action: 'pay', subject: 'Booking' })
  @Post(':id/pay')
  async payBooking(@Param('id') id: string): Promise<Payment> {
    return this.bookingsService.initBookingPayment(id);
  }

  @Rbac({ action: 'cancel', subject: 'Booking' })
  @Post(':id/cancel')
  async cancelBooking(@Param('id') id: string): Promise<IBooking> {
    return this.bookingsService.cancelBooking(id);
  }

  @Rbac({ action: 'confirm', subject: 'Booking' })
  @Post(':id/confirm/:paymentId')
  async confirmBooking(
    @Param('id') id: string,
    @Param('paymentId') paymentId: string,
  ): Promise<IBooking> {
    return this.bookingsService.confirmBookingPayment(id, paymentId);
  }
}
