export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
  loginExpires: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
