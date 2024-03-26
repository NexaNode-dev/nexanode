import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './user-role.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsersRolesRepository {
  constructor(
    @InjectRepository(UserRole)
    private readonly usersRolesRepository: Repository<UserRole>,
  ) {}

  async findAll(options?: FindManyOptions<UserRole>): Promise<UserRole[]> {
    return this.usersRolesRepository.find(options);
  }

  async findOne(options: FindOneOptions<UserRole>): Promise<UserRole> {
    const userRole = await this.usersRolesRepository.findOne(options);
    if (!userRole) {
      throw new NotFoundException(`UserRole with options ${options} not found`);
    }
    return userRole;
  }

  async create(userRole: Partial<UserRole>): Promise<UserRole> {
    const newUserRole = this.usersRolesRepository.create(userRole);
    return this.usersRolesRepository.save(newUserRole);
  }

  async update(
    options: Partial<UserRole>,
    userRole: Partial<UserRole>,
  ): Promise<UserRole> {
    const updatedUserRole = await this.usersRolesRepository.preload({
      ...options,
      ...userRole,
    });
    if (!updatedUserRole) {
      throw new NotFoundException(`UserRole with options ${options} not found`);
    }
    return this.usersRolesRepository.save(updatedUserRole);
  }

  async delete(options: FindOneOptions<UserRole>): Promise<string> {
    const deletedUserRole = await this.findOne(options);
    await this.usersRolesRepository.remove(deletedUserRole);
    return deletedUserRole.id;
  }
}
