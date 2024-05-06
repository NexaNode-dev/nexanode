import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContact } from '@nexanode/domain-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get('/api/contacts');
  }

  getContact(id: string) {
    return this.http.get(`/api/contacts/${id}`);
  }

  createContact(contact: Partial<IContact>) {
    return this.http.post('/api/contacts', contact);
  }

  updateContact(contact: IContact) {
    return this.http.put(`/api/contacts/${contact.id}`, contact);
  }

  deleteContact(id: string) {
    return this.http.delete(`/api/contacts/${id}`);
  }
}
