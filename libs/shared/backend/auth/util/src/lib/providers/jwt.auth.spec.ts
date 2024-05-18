import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuth } from './jwt.auth';
import { faker } from '@faker-js/faker';
import {
  IPermission,
  IRegister,
  IRole,
  IUser,
} from '@nexanode/domain-interfaces';
import { BadRequestException } from '@nestjs/common';
import { UsersRepository } from '@nexanode/backend-users-data-access';
import { PermissionsRepository } from '@nexanode/backend-permissions-data-access';
import { RolesRepository } from '@nexanode/backend-roles-data-access';
import { RolesPermissionsRepository } from '@nexanode/backend-roles-permissions-data-access';
import { UsersRolesRepository } from '@nexanode/backend-users-roles-data-access';
import { HashingService } from '@nexanode/backend-hashing-util';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('JwtAuth', () => {
  let provider: JwtAuth;

  const password = faker.internet.password();

  const userData: IRegister = {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };

  const expectedUser: IUser = {
    id: faker.string.uuid(),
    name: userData.name,
    email: userData.email,
    accessToken: faker.string.uuid(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    loginExpires: faker.date.soon(),
    isActive: true,
  };

  const userRoles = [
    {
      userId: expectedUser.id,
      roleId: faker.string.uuid(),
    },
  ];

  const roles: IRole[] = [
    {
      id: userRoles[0].roleId,
      name: faker.commerce.department(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    },
  ];

  const rolePermissions = [
    {
      roleId: roles[0].id,
      permissionId: faker.string.uuid(),
    },
  ];

  const permissions: IPermission[] = [
    {
      id: rolePermissions[0].permissionId,
      name: faker.commerce.productName(),
      action: faker.word.verb(),
      subject: faker.commerce.product(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    },
  ];

  const mockDataSource = {
    withRepository: jest.fn(),
    transaction: jest.fn().mockResolvedValue(expectedUser),
  };

  const mockUsersRepository = {
    create: jest.fn().mockResolvedValue(expectedUser),
    findAll: jest.fn().mockResolvedValue([expectedUser]),
    update: jest.fn().mockResolvedValue(expectedUser),
  };

  const mockUserRolesRepository = {
    findAll: jest.fn().mockResolvedValue(userRoles),
  };

  const mockRolesRepository = {
    findAll: jest.fn().mockResolvedValue(roles),
  };

  const mockRolesPermissionsRepository = {
    findAll: jest.fn().mockResolvedValue(rolePermissions),
  };

  const mockPermissionsRepository = {
    findAll: jest.fn().mockResolvedValue(permissions),
  };

  const mockHashingService = {
    hash: jest.fn().mockResolvedValue(password),
    compare: jest.fn().mockResolvedValue(true),
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue(expectedUser.accessToken),
  };

  const mockEventEmitter = {
    emit: jest.fn().mockReturnValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtAuth],
    })
      .useMocker((token) => {
        if (token === UsersRepository) {
          return mockUsersRepository;
        }
        if (token === UsersRolesRepository) {
          return mockUserRolesRepository;
        }
        if (token === RolesRepository) {
          return mockRolesRepository;
        }
        if (token === RolesPermissionsRepository) {
          return mockRolesPermissionsRepository;
        }
        if (token === PermissionsRepository) {
          return mockPermissionsRepository;
        }
        if (token === HashingService) {
          return mockHashingService;
        }
        if (token === JwtService) {
          return mockJwtService;
        }
        if (token === DataSource) {
          return mockDataSource;
        }
        if (token === EventEmitter2) {
          return mockEventEmitter;
        }
        return;
      })
      .compile();

    provider = module.get<JwtAuth>(JwtAuth);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('register', () => {
    it('should return user without password', async () => {
      const user = await provider.register(userData);
      expect(user.password).toBeUndefined();
    });
  });
  describe('login', () => {
    it('should throw error if user not found', async () => {
      try {
        await provider.login({ credential: 'not found', password });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    it('should throw error if password is invalid', async () => {
      try {
        await provider.login({
          credential: userData.email,
          password: 'invalid',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    it('should return user if credentials are valid', async () => {
      const result = await provider.login({
        credential: userData.email,
        password,
      });
      expect(result).toEqual(expectedUser);
    });
  });
});
