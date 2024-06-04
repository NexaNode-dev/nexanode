import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IService } from '@nexanode/domain-interfaces';

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
}
