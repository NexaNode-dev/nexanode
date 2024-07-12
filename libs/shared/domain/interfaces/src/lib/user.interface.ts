export interface IUser {
  id: string;
  userName: string;
  email: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
  loginExpires?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
