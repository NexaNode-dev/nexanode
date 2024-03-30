import { Injectable } from '@nestjs/common';
import { IUser } from '@nexanode/domain-interfaces';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export abstract class AuthService {
  abstract register(registerDto: RegisterDto): Promise<IUser>;
  abstract login(loginDto: LoginDto): Promise<{ user: IUser }>;
  abstract activate(userId: string, token: string): Promise<boolean>;
}
