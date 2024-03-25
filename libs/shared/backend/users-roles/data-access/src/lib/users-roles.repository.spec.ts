import { Test, TestingModule } from '@nestjs/testing';
import { UsersRolesRepository } from './users-roles.repository';
import { faker } from '@faker-js/faker';
import { UserRole } from './user-role.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UsersRolesRepository', () => {
  let provider: UsersRolesRepository;

  const userId = faker.string.uuid();
  const roleId = faker.string.uuid();

  const userRoleData = {
    userId,
    roleId,
  };

  const expectedUserRole = new UserRole({
    ...userRoleData,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  });

  const expectedUserRoles = [expectedUserRole];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedUserRoles),
    findOne: jest.fn().mockResolvedValue(expectedUserRole),
    create: jest.fn().mockReturnValue(expectedUserRole),
    save: jest.fn().mockResolvedValue(expectedUserRole),
    preload: jest.fn().mockResolvedValue(expectedUserRole),
    remove: jest.fn().mockResolvedValue(expectedUserRole.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRolesRepository],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(UserRole)) {
          return mockRepository;
        }
        return;
      })
      .compile();

    provider = module.get<UsersRolesRepository>(UsersRolesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of user roles', async () => {
      const userRoles = await provider.findAll();
      expect(userRoles).toEqual(expectedUserRoles);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a user role', async () => {
      const userRole = await provider.findOne({ where: { userId, roleId } });
      expect(userRole).toEqual(expectedUserRole);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { userId, roleId },
      });
    });
    it('should throw a NotFoundException', async () => {
      mockRepository.findOne.mockRejectedValueOnce(new NotFoundException());
      try {
        await provider.findOne({ where: { userId, roleId } });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create', () => {
    it('should create a user role', async () => {
      const userRole = await provider.create(userRoleData);
      expect(userRole).toEqual(expectedUserRole);
      expect(mockRepository.create).toHaveBeenCalledWith(userRoleData);
      expect(mockRepository.save).toHaveBeenCalledWith(expectedUserRole);
    });
  });
  describe('update', () => {
    it('should update and return a user role', async () => {
      expect(await provider.update({ userId, roleId }, userRoleData)).toEqual(
        expectedUserRole,
      );
      const options = { userId, roleId };
      expect(mockRepository.preload).toHaveBeenCalledWith({
        ...options,
        ...userRoleData,
      });
    });
    it('should throw a NotFoundException', async () => {
      mockRepository.preload.mockRejectedValueOnce(new NotFoundException());
      try {
        await provider.update({ userId, roleId }, userRoleData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('delete', () => {
    it('should delete a user role', async () => {
      expect(await provider.delete({ where: { userId, roleId } })).toEqual(
        expectedUserRole.id,
      );
      expect(mockRepository.remove).toHaveBeenCalledWith(expectedUserRole);
    });
    it('should throw a NotFoundException', async () => {
      mockRepository.findOne.mockRejectedValueOnce(new NotFoundException());
      try {
        await provider.delete({ where: { userId, roleId } });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
