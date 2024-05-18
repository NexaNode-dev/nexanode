import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { userFactory } from '@nexanode/testing-data-mocks-utils';
import { faker } from '@faker-js/faker';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  const password = faker.internet.password();

  const registerData = {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };

  const mockUser = userFactory();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should register a user', () => {
    service.register(registerData).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
    const req = httpController.expectOne('/api/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });
  it('should login a user', () => {
    service.login({ credential: mockUser.email, password }).subscribe((res) => {
      expect(res.user).toEqual(mockUser);
    });
    const req = httpController.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush({ user: mockUser });
  });
  it('should activate a user', () => {
    service.activate(mockUser.id, faker.string.nanoid()).subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const req = httpController.expectOne(`/api/auth/activate/${mockUser.id}/`);
    expect(req.request.method).toBe('PATCH');
    req.flush(true);
  });
});
