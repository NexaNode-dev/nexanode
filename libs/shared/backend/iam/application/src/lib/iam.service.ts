import { Injectable } from '@nestjs/common';
import { AuthService } from '@nexanode/backend-auth-util';
import { ILogin, IRegister, IUser } from '@nexanode/domain-interfaces';

@Injectable()
export class IamService {
  constructor(private readonly authService: AuthService) {}

  async login(login: ILogin): Promise<{ user: IUser }> {
    return this.authService.login(login);
  }

  async register(register: IRegister): Promise<IUser> {
    return this.authService.register(register);
  }

  async activate(userId: string, token: string): Promise<boolean> {
    return this.authService.activate(userId, token);
  }
}
