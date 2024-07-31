import { IBooking } from '@nexanode/domain-interfaces';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string | undefined;

  @IsOptional()
  @IsString()
  contactName?: string | undefined;

  @IsOptional()
  @IsEmail()
  contactEmail?: string | undefined;

  @IsOptional()
  @IsString()
  contactPhone?: string | undefined;

  @IsOptional()
  @IsString()
  addressLine1?: string | undefined;

  @IsOptional()
  @IsString()
  addressLine2?: string | undefined;

  @IsOptional()
  @IsString()
  city?: string | undefined;

  @IsOptional()
  @IsString()
  state?: string | undefined;

  @IsOptional()
  @IsString()
  postalCode?: string | undefined;

  @IsOptional()
  @IsString()
  country?: string | undefined;

  @IsNotEmpty()
  @IsNumber()
  units!: number;

  @IsOptional()
  @IsString()
  notes?: string | undefined;

  @IsOptional()
  @IsString()
  paymentId?: string | undefined;
}
