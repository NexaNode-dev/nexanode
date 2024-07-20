import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory, IService } from '@nexanode/domain-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private readonly apiUrl = '/api/services';
  constructor(private readonly http: HttpClient) {}

  getServices() {
    return this.http.get<IService[]>(this.apiUrl);
  }

  getService(id: string) {
    return this.http.get<IService>(`${this.apiUrl}/${id}`);
  }

  createService(service: Partial<IService>) {
    return this.http.post<IService>(this.apiUrl, service);
  }

  updateService(service: Partial<IService>) {
    return this.http.patch<IService>(`${this.apiUrl}/${service.id}`, service);
  }

  deleteService(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getServicesByCategory(categoryId: string) {
    return this.http.get<IService[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  getCategories() {
    return this.http.get<ICategory[]>(`${this.apiUrl}/categories`);
  }

  getCategory(id: string) {
    return this.http.get<ICategory>(`${this.apiUrl}/categories/${id}`);
  }

  createCategory(category: Partial<ICategory>) {
    return this.http.post<ICategory>(`${this.apiUrl}/categories`, category);
  }

  updateCategory(category: Partial<ICategory>) {
    return this.http.patch<ICategory>(
      `${this.apiUrl}/categories/${category.id}`,
      category,
    );
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.apiUrl}/categories/${id}`);
  }
}
