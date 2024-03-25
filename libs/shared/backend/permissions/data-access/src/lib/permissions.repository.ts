import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { IPermission } from '@nexanode/domain-interfaces';

@Injectable()
export class PermissionsRepository {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async findAll(options?: FindManyOptions<Permission>): Promise<Permission[]> {
    return this.permissionRepository.find(options);
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException(`Permission #${id} not found`);
    }
    return permission;
  }

  async create(permission: Partial<IPermission>): Promise<Permission> {
    const newPermission = this.permissionRepository.create(permission);
    return this.permissionRepository.save(newPermission);
  }

  async update(
    id: string,
    permission: Partial<IPermission>,
  ): Promise<Permission> {
    const updatedPermission = await this.permissionRepository.preload({
      id,
      ...permission,
    });
    if (!updatedPermission) {
      throw new NotFoundException(`Permission #${id} not found`);
    }
    return this.permissionRepository.save(updatedPermission);
  }

  async delete(id: string): Promise<string> {
    const permission = await this.findOne(id);
    await this.permissionRepository.remove(permission);
    return id;
  }
}
