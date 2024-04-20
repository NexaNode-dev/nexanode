import { IUser } from './user.interface';

export interface IRegister extends Pick<IUser, 'email' | 'password' | 'name'> {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
