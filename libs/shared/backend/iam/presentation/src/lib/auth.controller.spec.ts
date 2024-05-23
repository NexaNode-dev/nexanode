import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { RegisterDto } from './dto/register.dto';
import { faker } from '@faker-js/faker';
import { IUser } from '@nexanode/domain-interfaces';
import { IamService } from '@nexanode/backend-iam-application';

describe('AuthController', () => {
  let controller: AuthController;

  const password = faker.internet.password();

  const userData: RegisterDto = {
    email: faker.internet.email(),
    password,
    userName: faker.internet.userName(),
    confirmPassword: password,
  };

  const expectedUser: IUser = {
    ...userData,
    id: faker.string.uuid(),
    loginExpires: faker.date.future(),
    isActive: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  const mockIamService = {
    register: jest.fn().mockResolvedValue(expectedUser),
    login: jest.fn().mockResolvedValue({ user: expectedUser }),
    activate: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: IamService,
          useValue: mockIamService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('register', () => {
    it('should register a user', async () => {
      expect(await controller.register(userData)).toEqual(expectedUser);
    });
    it('should fail when passwords do not match', async () => {
      const invalidData = {
        ...userData,
        confirmPassword: faker.internet.password(),
      };
      try {
        await controller.register(invalidData);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });
  describe('login', () => {
    it('should login a user', async () => {
      expect(
        await controller.login({ credential: userData.email, password }),
      ).toEqual({ user: expectedUser });
    });
  });
  describe('activate', () => {
    it('should activate a user', async () => {
      expect(
        await controller.activate(expectedUser.id, faker.string.alphanumeric()),
      ).toBe(true);
    });
  });
});
