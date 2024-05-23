import { IUser } from './user.interface';

export interface IRegister
  extends Pick<IUser, 'email' | 'password' | 'userName'> {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleName?: string;
}
