export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
  loginExpires: Date;
  createdAt: Date;
  updatedAt: Date;
}
