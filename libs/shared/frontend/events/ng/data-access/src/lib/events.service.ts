import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent } from '@nexanode/domain-interfaces';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl = '/api/events';

  constructor(private readonly http: HttpClient) {}

  getEvents() {
    return this.http.get<IEvent[]>(this.apiUrl);
  }

  getEvent(id: string) {
    return this.http.get<IEvent>(`${this.apiUrl}/${id}`);
  }

  createEvent(event: Partial<IEvent>) {
    return this.http.post<IEvent>(this.apiUrl, event);
  }

  updateEvent(event: Partial<IEvent>) {
    return this.http.patch<IEvent>(`${this.apiUrl}/${event.id}`, event);
  }

  deleteEvent(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
