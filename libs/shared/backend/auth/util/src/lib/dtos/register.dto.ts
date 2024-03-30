import { IUser } from '@nexanode/domain-interfaces';
import {
  Equals,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegisterDto implements Pick<IUser, 'email' | 'password' | 'name'> {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  @Equals('password')
  confirmPassword!: string;
}
