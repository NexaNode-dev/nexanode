import { IRegister } from '@nexanode/domain-interfaces';
import {
  Equals,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegisterDto implements IRegister {
  @IsOptional()
  @IsString()
  userName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  @Equals('password')
  confirmPassword!: string;

  @IsOptional()
  @IsString()
  roleName?: string;
}
