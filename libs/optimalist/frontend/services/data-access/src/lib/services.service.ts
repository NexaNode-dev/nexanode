/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private servicesUrl = 'assets/services.json';

  constructor(private http: HttpClient) {}

  getServices(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(this.servicesUrl));
  }

  getServiceById(id: string): Promise<any> {
    return firstValueFrom(
      this.http
        .get<any[]>(this.servicesUrl)
        .pipe(map((services) => services.find((service) => service.id === id))),
    );
  }
}
