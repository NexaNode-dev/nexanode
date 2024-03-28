import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Role } from './role.enity';
import { IRole } from '@nexanode/domain-interfaces';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(options?: FindManyOptions<Role>): Promise<Role[]> {
    return this.roleRepository.find(options);
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return role;
  }

  async create(role: Partial<IRole>): Promise<Role> {
    const newRole = this.roleRepository.create(role);
    return this.roleRepository.save(newRole);
  }

  async update(id: string, role: Partial<IRole>): Promise<Role> {
    const updatedRole = await this.roleRepository.preload({
      id,
      ...role,
    });
    if (!updatedRole) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return this.roleRepository.save(updatedRole);
  }

  async delete(id: string): Promise<string> {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role);
    return id;
  }
}
