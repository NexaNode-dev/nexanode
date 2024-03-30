import { Test, TestingModule } from '@nestjs/testing';
import { RbacGuard } from './rbac.guard';
import { RbacFactory } from './factories/rbac.factory';
import { PermissionsRepository } from '@nexanode/backend-permissions-data-access';
import { RolesPermissionsRepository } from '@nexanode/backend-roles-permissions-data-access';
import { UsersRolesRepository } from '@nexanode/backend-users-roles-data-access';
import { UsersRepository } from '@nexanode/backend-users-data-access';

describe('RbacGuard', () => {
  let guard: RbacGuard;

  const mockUsersRepository = {
    findAll: jest.fn(),
  };

  const mockUsersRolesRepository = {
    findAll: jest.fn(),
  };

  const mockRolesPermissionsRepository = {
    findAll: jest.fn(),
  };

  const mockPermissionsRepository = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RbacGuard, RbacFactory],
    })
      .useMocker((token) => {
        if (token === UsersRepository) {
          return mockUsersRepository;
        }
        if (token === UsersRolesRepository) {
          return mockUsersRolesRepository;
        }
        if (token === RolesPermissionsRepository) {
          return mockRolesPermissionsRepository;
        }
        if (token === PermissionsRepository) {
          return mockPermissionsRepository;
        }
        return;
      })
      .compile();

    guard = module.get<RbacGuard>(RbacGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
