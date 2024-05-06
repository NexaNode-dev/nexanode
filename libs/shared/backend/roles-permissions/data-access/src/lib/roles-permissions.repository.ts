import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { RolePermission } from './role-permission.entity';

@Injectable()
export class RolesPermissionsRepository extends Repository<RolePermission> {
  constructor(
    @InjectRepository(RolePermission)
    private rolesPermissionsRepository: Repository<RolePermission>,
  ) {
    super(
      RolePermission,
      rolesPermissionsRepository.manager,
      rolesPermissionsRepository.queryRunner,
    );
  }

  async getRolePermissions(
    options: FindManyOptions<RolePermission> = {},
  ): Promise<RolePermission[]> {
    return this.rolesPermissionsRepository.find(options);
  }

  async getRolePermission(
    options: FindOneOptions<RolePermission> = {},
  ): Promise<RolePermission> {
    const rolePermission =
      await this.rolesPermissionsRepository.findOne(options);
    if (!rolePermission) {
      throw new NotFoundException(
        `RolePermission with options ${options} not found`,
      );
    }
    return rolePermission;
  }

  async createRolePermission(
    rolePermission: Partial<RolePermission>,
  ): Promise<RolePermission> {
    const newRolePermission =
      this.rolesPermissionsRepository.create(rolePermission);
    return this.rolesPermissionsRepository.save(newRolePermission);
  }

  async updateRolePermission(
    options: Partial<RolePermission>,
    rolePermission: Partial<RolePermission>,
  ): Promise<RolePermission> {
    const updatedRolePermission = await this.rolesPermissionsRepository.preload(
      {
        ...options,
        ...rolePermission,
      },
    );
    if (!updatedRolePermission) {
      throw new NotFoundException(
        `RolePermission with options ${options} not found`,
      );
    }
    return this.rolesPermissionsRepository.save(updatedRolePermission);
  }

  async deleteRolePermission(
    options: FindOneOptions<RolePermission>,
  ): Promise<RolePermission> {
    const rolePermission = await this.getRolePermission(options);
    return this.rolesPermissionsRepository.remove(rolePermission);
  }
}
