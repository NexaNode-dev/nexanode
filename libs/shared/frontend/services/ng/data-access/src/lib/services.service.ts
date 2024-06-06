import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory, IService } from '@nexanode/domain-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private readonly http: HttpClient) {}

  getServices() {
    return this.http.get<IService[]>('api/services');
  }

  getService(id: string) {
    return this.http.get<IService>(`api/services/${id}`);
  }

  createService(service: Partial<IService>) {
    return this.http.post<IService>('api/services', service);
  }

  updateService(service: Partial<IService>) {
    return this.http.put<IService>(`api/services/${service.id}`, service);
  }

  deleteService(id: string) {
    return this.http.delete(`api/services/${id}`);
  }

  getServicesByCategory(categoryId: string) {
    return this.http.get<IService[]>(`api/services/category/${categoryId}`);
  }

  getCategories() {
    return this.http.get<ICategory[]>('api/services/categories');
  }

  getCategory(id: string) {
    return this.http.get<ICategory>(`api/services/categories/${id}`);
  }

  createCategory(category: Partial<ICategory>) {
    return this.http.post<ICategory>('api/services/categories', category);
  }

  updateCategory(category: Partial<ICategory>) {
    return this.http.put<ICategory>(
      `api/services/categories/${category.id}`,
      category,
    );
  }

  deleteCategory(id: string) {
    return this.http.delete(`api/services/categories/${id}`);
  }
}
