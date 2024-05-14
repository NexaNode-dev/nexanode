import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContact } from '@nexanode/domain-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get<IContact[]>('/api/contacts');
  }

  getContact(id: string) {
    return this.http.get<IContact>(`/api/contacts/${id}`);
  }

  createContact(contact: Partial<IContact>) {
    return this.http.post<IContact>('/api/contacts', contact);
  }

  updateContact(contact: Partial<IContact>) {
    return this.http.patch<IContact>(`/api/contacts/${contact.id}`, contact);
  }

  deleteContact(id: string) {
    return this.http.delete<string>(`/api/contacts/${id}`);
  }
}
