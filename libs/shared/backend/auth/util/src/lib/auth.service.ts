import { Injectable } from '@nestjs/common';
import { ILogin, IRegister, IUser } from '@nexanode/domain-interfaces';

@Injectable()
export abstract class AuthService {
  abstract register(register: IRegister): Promise<IUser>;
  abstract login(login: ILogin): Promise<{ user: IUser }>;
  abstract activate(userId: string, token: string): Promise<boolean>;
}
