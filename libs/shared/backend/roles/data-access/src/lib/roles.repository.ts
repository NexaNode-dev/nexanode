import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Role } from './role.enity';
import { IRole } from '@nexanode/domain-interfaces';

@Injectable()
export class RolesRepository extends Repository<Role> {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {
    super(Role, rolesRepository.manager, rolesRepository.queryRunner);
  }

  async getRoles(options: FindManyOptions<Role> = {}): Promise<Role[]> {
    return this.rolesRepository.find(options);
  }

  async getRole(options: FindOneOptions<Role> = {}): Promise<Role> {
    const role = await this.rolesRepository.findOne(options);
    if (!role) {
      throw new NotFoundException(
        `Role with options ${JSON.stringify(options)} not found`,
      );
    }
    return role;
  }

  async createRole(role: Partial<IRole>): Promise<Role> {
    const newRole = this.rolesRepository.create(role);
    return this.rolesRepository.save(newRole);
  }

  async updateRole(id: string, role: Partial<IRole>): Promise<Role> {
    const updatedRole = await this.rolesRepository.preload({
      id,
      ...role,
    });
    if (!updatedRole) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return this.rolesRepository.save(updatedRole);
  }

  async deleteRole(id: string): Promise<string> {
    const role = await this.getRole({ where: { id } });
    await this.rolesRepository.remove(role);
    return id;
  }
}
