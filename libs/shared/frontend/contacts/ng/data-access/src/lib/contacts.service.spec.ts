import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ContactsService } from './contacts.service';
import {
  contactFactory,
  contactsFactory,
} from '@nexanode/testing-data-mocks-utils';

describe('ContactsService', () => {
  let service: ContactsService;
  let httpController: HttpTestingController;

  const mockContacts = contactsFactory();

  const mockContact = contactFactory();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactsService],
    });
    service = TestBed.inject(ContactsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get contacts', () => {
    service.getContacts().subscribe((contacts) => {
      expect(contacts).toEqual(mockContacts);
    });

    const req = httpController.expectOne('/api/contacts');
    expect(req.request.method).toBe('GET');
    req.flush(mockContacts);
  });

  it('should get contact', () => {
    service.getContact(mockContact.id).subscribe((contact) => {
      expect(contact).toEqual(mockContact);
    });

    const req = httpController.expectOne(`/api/contacts/${mockContact.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockContact);
  });

  it('should create contact', () => {
    service.createContact(mockContact).subscribe((contact) => {
      expect(contact).toEqual(mockContact);
    });

    const req = httpController.expectOne('/api/contacts');
    expect(req.request.method).toBe('POST');
    req.flush(mockContact);
  });

  it('should update contact', () => {
    service.updateContact(mockContact).subscribe((contact) => {
      expect(contact).toEqual(mockContact);
    });

    const req = httpController.expectOne(`/api/contacts/${mockContact.id}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockContact);
  });

  it('should delete contact', () => {
    service.deleteContact(mockContact.id).subscribe((contact) => {
      expect(contact).toEqual(mockContact);
    });

    const req = httpController.expectOne(`/api/contacts/${mockContact.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockContact);
  });
});
