import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { RolePermission } from './role-permission.entity';

@Injectable()
export class RolesPermissionsRepository {
  constructor(
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async findAll(
    options?: FindManyOptions<RolePermission>,
  ): Promise<RolePermission[]> {
    return this.rolePermissionRepository.find(options);
  }

  async findOne(
    options: FindOneOptions<RolePermission>,
  ): Promise<RolePermission> {
    const rolePermission = await this.rolePermissionRepository.findOne(options);
    if (!rolePermission) {
      throw new NotFoundException(
        `RolePermission with options ${options} not found`,
      );
    }
    return rolePermission;
  }

  async create(
    rolePermission: Partial<RolePermission>,
  ): Promise<RolePermission> {
    const newRolePermission =
      this.rolePermissionRepository.create(rolePermission);
    return this.rolePermissionRepository.save(newRolePermission);
  }

  async update(
    options: Partial<RolePermission>,
    rolePermission: Partial<RolePermission>,
  ): Promise<RolePermission> {
    const updatedRolePermission = await this.rolePermissionRepository.preload({
      ...options,
      ...rolePermission,
    });
    if (!updatedRolePermission) {
      throw new NotFoundException(
        `RolePermission with options ${options} not found`,
      );
    }
    return this.rolePermissionRepository.save(updatedRolePermission);
  }

  async delete(
    options: FindOneOptions<RolePermission>,
  ): Promise<RolePermission> {
    const rolePermission = await this.findOne(options);
    return this.rolePermissionRepository.remove(rolePermission);
  }
}
