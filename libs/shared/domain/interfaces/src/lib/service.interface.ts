export interface IService {
  id: string;
  name: string;
  summary: string;
  description?: string;
  price?: number;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}
