export interface IService {
  id: string;
  name: string;
  summary: string;
  description?: string;
  price?: number;
  categoryId?: string;
  featuredImage?: string;
  createdAt: Date;
  updatedAt: Date;
}
