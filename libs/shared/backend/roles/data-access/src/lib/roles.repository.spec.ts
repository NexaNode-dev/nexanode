import { Test, TestingModule } from '@nestjs/testing';
import { RolesRepository } from './roles.repository';
import { IRole } from '@nexanode/domain-interfaces';
import { Role } from './role.enity';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('RolesRepository', () => {
  let provider: RolesRepository;

  const roleData: Partial<IRole> = {
    name: faker.commerce.department(),
  };

  const expectedRole: IRole = new Role({
    ...roleData,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  });

  const expectedRoles: IRole[] = [expectedRole];

  const mockRepository = {
    find: jest.fn().mockReturnValue(expectedRoles),
    findOne: jest.fn().mockReturnValue(expectedRole),
    create: jest.fn().mockReturnValue(expectedRole),
    save: jest.fn().mockReturnValue(expectedRole),
    preload: jest.fn().mockReturnValue(expectedRole),
    remove: jest.fn().mockReturnValue(expectedRole.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesRepository],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(Role)) {
          return mockRepository;
        }
        return;
      })
      .compile();

    provider = module.get<RolesRepository>(RolesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      expect(await provider.getRoles()).toEqual(expectedRoles);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a role by id', async () => {
      expect(
        await provider.getRole({ where: { id: expectedRole.id } }),
      ).toEqual(expectedRole);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: expectedRole.id },
      });
    });
    it('should throw a NotFoundException if role not found', async () => {
      mockRepository.findOne.mockRejectedValueOnce(
        new NotFoundException('Role not found'),
      );
      try {
        await provider.getRole({ where: { id: expectedRole.id } });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a role', async () => {
      expect(await provider.createRole(roleData)).toEqual(expectedRole);
      expect(mockRepository.create).toHaveBeenCalledWith(roleData);
      expect(mockRepository.save).toHaveBeenCalledWith(expectedRole);
    });
  });

  describe('update', () => {
    it('should update a role', async () => {
      expect(await provider.updateRole(expectedRole.id, roleData)).toEqual(
        expectedRole,
      );
      expect(mockRepository.preload).toHaveBeenCalledWith({
        id: expectedRole.id,
        ...roleData,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(expectedRole);
    });
    it('should throw a NotFoundException if role not found', async () => {
      mockRepository.preload.mockRejectedValueOnce(
        new NotFoundException('Role not found'),
      );
      try {
        await provider.updateRole(expectedRole.id, roleData);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('should remove a role', async () => {
      expect(await provider.deleteRole(expectedRole.id)).toEqual(
        expectedRole.id,
      );
      expect(mockRepository.remove).toHaveBeenCalledWith(expectedRole);
    });
    it('should throw a NotFoundException if role not found', async () => {
      mockRepository.remove.mockRejectedValueOnce(
        new NotFoundException('Role not found'),
      );
      try {
        await provider.deleteRole(expectedRole.id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
