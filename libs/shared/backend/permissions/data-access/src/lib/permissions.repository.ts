import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { IPermission } from '@nexanode/domain-interfaces';

@Injectable()
export class PermissionsRepository extends Repository<Permission> {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {
    super(
      Permission,
      permissionsRepository.manager,
      permissionsRepository.queryRunner,
    );
  }

  async getPermissions(
    options: FindManyOptions<Permission> = {},
  ): Promise<Permission[]> {
    return this.permissionsRepository.find(options);
  }

  async getPermission(
    options: FindManyOptions<Permission> = {},
  ): Promise<Permission> {
    const permission = await this.permissionsRepository.findOne(options);
    if (!permission) {
      throw new NotFoundException(
        `Permission with options ${JSON.stringify(options)} not found`,
      );
    }
    return permission;
  }

  async createPermission(
    permission: Partial<IPermission>,
  ): Promise<Permission> {
    const newPermission = this.permissionsRepository.create(permission);
    return this.permissionsRepository.save(newPermission);
  }

  async updatePermission(
    id: string,
    permission: Partial<IPermission>,
  ): Promise<Permission> {
    const updatedPermission = await this.permissionsRepository.preload({
      id,
      ...permission,
    });
    if (!updatedPermission) {
      throw new NotFoundException(`Permission #${id} not found`);
    }
    return this.permissionsRepository.save(updatedPermission);
  }

  async deletePermission(id: string): Promise<string> {
    const permission = await this.getPermission({ where: { id } });
    await this.permissionsRepository.remove(permission);
    return id;
  }
}
