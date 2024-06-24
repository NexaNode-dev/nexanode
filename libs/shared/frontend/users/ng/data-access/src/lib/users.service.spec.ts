import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { usersFactory } from '@nexanode/testing-data-mocks-utils';

describe('UsersService', () => {
  let service: UsersService;
  let httpController: HttpTestingController;

  const expectedUsers = usersFactory();
  const expectedUser = expectedUsers[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(UsersService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getUsers', () => {
    it('should get users', () => {
      service.getUsers().subscribe((users) => {
        expect(users).toEqual(expectedUsers);
      });
      const req = httpController.expectOne('/api/users');
      expect(req.request.method).toBe('GET');
      req.flush(expectedUsers);
    });
  });
  describe('getUser', () => {
    it('should get user', () => {
      service.getUser(expectedUser.id).subscribe((user) => {
        expect(user).toEqual(expectedUser);
      });
      const req = httpController.expectOne(`/api/users/${expectedUser.id}`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedUser);
    });
  });
  describe('createUser', () => {
    it('should create user', () => {
      service.createUser(expectedUser).subscribe((user) => {
        expect(user).toEqual(expectedUser);
      });
      const req = httpController.expectOne('/api/users');
      expect(req.request.method).toBe('POST');
      req.flush(expectedUser);
    });
  });
  describe('updateUser', () => {
    it('should update user', () => {
      service.updateUser(expectedUser.id, expectedUser).subscribe((user) => {
        expect(user).toEqual(expectedUser);
      });
      const req = httpController.expectOne(`/api/users/${expectedUser.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(expectedUser);
    });
  });
  describe('deleteUser', () => {
    it('should delete user', () => {
      service.deleteUser(expectedUser.id).subscribe((id) => {
        expect(id).toEqual(expectedUser.id);
      });
      const req = httpController.expectOne(`/api/users/${expectedUser.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(expectedUser.id);
    });
  });
});
