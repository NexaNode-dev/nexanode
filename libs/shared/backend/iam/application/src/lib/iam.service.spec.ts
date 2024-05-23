import { Test, TestingModule } from '@nestjs/testing';
import { IamService } from './iam.service';
import { IRegister, IUser } from '@nexanode/domain-interfaces';
import { faker } from '@faker-js/faker';
import { AuthService } from '@nexanode/backend-auth-util';

describe('IamService', () => {
  let service: IamService;

  const password = faker.internet.password();

  const userData: IRegister = {
    email: faker.internet.email(),
    password,
    userName: faker.internet.userName(),
    confirmPassword: password,
  };

  const expectedUser: IUser = {
    ...userData,
    id: faker.string.uuid(),
    loginExpires: faker.date.future(),
    isActive: false,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  const mockAuthService = {
    login: jest.fn().mockResolvedValue({ user: expectedUser }),
    register: jest.fn().mockResolvedValue(expectedUser),
    activate: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamService,
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    service = module.get<IamService>(IamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('register', () => {
    it('should register a user', async () => {
      expect(await service.register(userData)).toEqual(expectedUser);
    });
  });
  describe('login', () => {
    it('should login a user', async () => {
      expect(
        await service.login({ credential: userData.email, password }),
      ).toEqual({
        user: expectedUser,
      });
    });
  });
  describe('activate', () => {
    it('should activate a user', async () => {
      expect(
        await service.activate(expectedUser.id, faker.string.alphanumeric()),
      ).toBe(true);
    });
  });
});
