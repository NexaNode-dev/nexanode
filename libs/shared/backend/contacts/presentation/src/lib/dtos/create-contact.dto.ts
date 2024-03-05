import { IContact } from '@nexanode/domain-interfaces';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateContactDto
  implements
    Pick<
      IContact,
      | 'name'
      | 'email'
      | 'phone'
      | 'url'
      | 'address'
      | 'city'
      | 'state'
      | 'zip'
      | 'country'
      | 'subject'
      | 'message'
    >
{
  @IsNotEmpty()
  @IsString()
  name!: string;
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @IsOptional()
  @IsPhoneNumber()
  phone?: string | undefined;
  @IsOptional()
  @IsUrl()
  url?: string | undefined;
  @IsOptional()
  @IsString()
  address?: string | undefined;
  @IsOptional()
  @IsString()
  city?: string | undefined;
  @IsOptional()
  @IsString()
  state?: string | undefined;
  @IsOptional()
  @IsString()
  zip?: string | undefined;
  @IsOptional()
  @IsString()
  country?: string | undefined;
  @IsOptional()
  @IsString()
  subject?: string | undefined;
  @IsNotEmpty()
  @IsString()
  message!: string;
}
