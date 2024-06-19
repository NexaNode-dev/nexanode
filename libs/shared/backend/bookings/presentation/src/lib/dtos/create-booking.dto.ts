import { IBooking } from '@nexanode/domain-interfaces';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateBookingDto
  implements
    Omit<IBooking, 'id' | 'reference' | 'status' | 'createdAt' | 'updatedAt'>
{
  @IsNotEmpty()
  @IsUUID()
  eventId!: string;

  @IsOptional()
  @IsUUID()
  userId?: string | undefined;
}
