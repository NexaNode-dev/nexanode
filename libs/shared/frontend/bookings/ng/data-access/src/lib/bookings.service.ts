import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBooking, IQueryParams } from '@nexanode/domain-interfaces';
import { convertToHttpParams } from '@nexanode/frontend-http-params-util';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private apiUrl = '/api/bookings';

  constructor(private readonly http: HttpClient) {}

  getBookings(query: IQueryParams<IBooking> = {}) {
    const params = convertToHttpParams(query);
    return this.http.get<IBooking[]>(this.apiUrl, { params });
  }

  getBooking(id: string) {
    return this.http.get<IBooking>(`${this.apiUrl}/${id}`);
  }

  createBooking(booking: Partial<IBooking>) {
    return this.http.post<IBooking>(this.apiUrl, booking);
  }

  updateBooking(id: string, booking: Partial<IBooking>) {
    return this.http.patch<IBooking>(`${this.apiUrl}/${id}`, booking);
  }

  deleteBooking(id: string) {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

  payBooking(id: string) {
    return this.http.post<string>(`${this.apiUrl}/${id}/pay`, null);
  }

  cancelBooking(id: string) {
    return this.http.post<IBooking>(`${this.apiUrl}/${id}/cancel`, null);
  }

  confirmBooking(id: string, paymentId: string) {
    return this.http.post<IBooking>(
      `${this.apiUrl}/${id}/confirm/${paymentId}`,
      null,
    );
  }
}
