import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsRepository } from './permissions.repository';
import { IPermission } from '@nexanode/domain-interfaces';
import { faker } from '@faker-js/faker';
import { Permission } from './permission.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('PermissionsRepository', () => {
  let provider: PermissionsRepository;

  const permissionData: Partial<IPermission> = {
    name: faker.commerce.productName(),
    action: faker.company.buzzNoun(),
    subject: faker.company.catchPhraseNoun(),
  };

  const expectedPermission: IPermission = new Permission({
    ...permissionData,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  });

  const expectedPermissions: IPermission[] = [expectedPermission];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedPermissions),
    findOne: jest.fn().mockResolvedValue(expectedPermission),
    create: jest.fn().mockReturnValue(expectedPermission),
    save: jest.fn().mockResolvedValue(expectedPermission),
    preload: jest.fn().mockReturnValue(expectedPermission),
    remove: jest.fn().mockResolvedValue(expectedPermission.id),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionsRepository],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(Permission)) {
          return mockRepository;
        }
        return;
      })
      .compile();

    provider = module.get<PermissionsRepository>(PermissionsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of permissions', async () => {
      expect(await provider.findAll()).toEqual(expectedPermissions);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a permission', async () => {
      expect(await provider.findOne(expectedPermission.id)).toEqual(
        expectedPermission,
      );
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: expectedPermission.id },
      });
    });
    it('should throw a NotFoundException', async () => {
      mockRepository.findOne.mockRejectedValueOnce(new NotFoundException());
      try {
        await provider.findOne(expectedPermission.id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create', () => {
    it('should return a permission', async () => {
      expect(await provider.create(permissionData)).toEqual(expectedPermission);
      expect(mockRepository.create).toHaveBeenCalledWith(permissionData);
      expect(mockRepository.save).toHaveBeenCalledWith(expectedPermission);
    });
  });
  describe('update', () => {
    it('should return a permission', async () => {
      expect(
        await provider.update(expectedPermission.id, permissionData),
      ).toEqual(expectedPermission);
      expect(mockRepository.preload).toHaveBeenCalledWith({
        id: expectedPermission.id,
        ...permissionData,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(expectedPermission);
    });
    it('should throw a NotFoundException', async () => {
      mockRepository.preload.mockRejectedValueOnce(new NotFoundException());
      try {
        await provider.update(expectedPermission.id, permissionData);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('delete', () => {
    it('should return a permission id', async () => {
      expect(await provider.delete(expectedPermission.id)).toEqual(
        expectedPermission.id,
      );
      expect(mockRepository.remove).toHaveBeenCalledWith(expectedPermission);
    });
    it('should throw a NotFoundException', async () => {
      mockRepository.remove.mockRejectedValueOnce(new NotFoundException());
      try {
        await provider.delete(expectedPermission.id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
