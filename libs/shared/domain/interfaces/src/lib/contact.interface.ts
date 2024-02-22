export interface IContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  url?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  subject?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}