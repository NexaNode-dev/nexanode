import { IMedia } from "./media.interface";

export interface IService {
  id: string;
  name: string;
  summary: string;
  description?: string;
  price?: number;
  categoryId?: string;
  featuredImageId?: string;
  featuredImage?: IMedia;
  createdAt: Date;
  updatedAt: Date;
}
