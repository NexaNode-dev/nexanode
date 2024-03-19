import { Test, TestingModule } from '@nestjs/testing';
import { RolesPermissionsRepository } from './roles-permissions.repository';
import { faker } from '@faker-js/faker';
import { RolePermission } from './role-permission.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('RolesPermissionsRepository', () => {
  let provider: RolesPermissionsRepository;

  const rolePermissionData = {
    roleId: faker.string.uuid(),
    permissionId: faker.string.uuid(),
  };

  const expectedRolePermission = new RolePermission({
    ...rolePermissionData,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  });

  const expectedRolePermissions = [expectedRolePermission];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedRolePermissions),
    findOne: jest.fn().mockResolvedValue(expectedRolePermission),
    create: jest.fn().mockReturnValue(expectedRolePermission),
    save: jest.fn().mockResolvedValue(expectedRolePermission),
    preload: jest.fn().mockReturnValue(expectedRolePermission),
    remove: jest.fn().mockResolvedValue(expectedRolePermission.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesPermissionsRepository],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(RolePermission)) {
          return mockRepository;
        }
        return;
      })
      .compile();

    provider = module.get<RolesPermissionsRepository>(
      RolesPermissionsRepository,
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('findAll', () => {
    it('should return all rolePermissions', async () => {
      const rolePermissions = await provider.findAll();
      expect(rolePermissions).toEqual(expectedRolePermissions);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a rolePermission by id', async () => {
      const rolePermission = await provider.findOne({
        where: { ...rolePermissionData },
      });
      expect(rolePermission).toEqual(expectedRolePermission);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { ...rolePermissionData },
      });
    });
    it('should return a NotFoundException if rolePermission is not found', async () => {
      mockRepository.findOne.mockRejectedValueOnce(new NotFoundException());
      try {
        await provider.findOne({ where: { ...rolePermissionData } });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create', () => {
    it('should create a rolePermission', async () => {
      const rolePermission = await provider.create(rolePermissionData);
      expect(rolePermission).toEqual(expectedRolePermission);
      expect(mockRepository.create).toHaveBeenCalledWith(rolePermissionData);
    });
  });
  describe('update', () => {
    it('should update a rolePermission', async () => {
      const rolePermission = await provider.update(
        rolePermissionData,
        rolePermissionData,
      );
      expect(rolePermission).toEqual(expectedRolePermission);
      expect(mockRepository.preload).toHaveBeenCalledWith({
        ...rolePermissionData,
        ...rolePermissionData,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(expectedRolePermission);
    });
    it('should return a NotFoundException if rolePermission is not found', async () => {
      mockRepository.preload.mockRejectedValueOnce(new NotFoundException());
      try {
        await provider.update(rolePermissionData, rolePermissionData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('delete', () => {
    it('should remove a rolePermission', async () => {
      const rolePermission = await provider.delete({
        where: { ...rolePermissionData },
      });
      expect(rolePermission).toEqual(expectedRolePermission.id);
      expect(mockRepository.remove).toHaveBeenCalledWith(
        expectedRolePermission,
      );
    });
    it('should return a NotFoundException if rolePermission is not found', async () => {
      mockRepository.remove.mockRejectedValueOnce(new NotFoundException());
      try {
        await provider.delete({ where: { ...rolePermissionData } });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
