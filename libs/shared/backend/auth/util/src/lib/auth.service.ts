import { Injectable } from '@nestjs/common';
import {
  ILogin,
  IPermission,
  IRegister,
  IUser,
} from '@nexanode/domain-interfaces';

@Injectable()
export abstract class AuthService {
  abstract register(register: IRegister): Promise<IUser>;
  abstract login(
    login: ILogin,
  ): Promise<{ user: IUser; permissions: IPermission[] }>;
  abstract activate(userId: string, token: string): Promise<boolean>;
  abstract forgotPassword(credential: string): Promise<boolean>;
  abstract resetPassword(token: string, password: string): Promise<boolean>;
}
