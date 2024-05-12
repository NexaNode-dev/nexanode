import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {
    super(User, usersRepository.manager, usersRepository.queryRunner);
  }

  getUsers(options: FindManyOptions<User> = {}): Promise<User[]> {
    return this.usersRepository.find(options);
  }

  async getUser(options: FindOneOptions = {}): Promise<User> {
    const user = await this.usersRepository.findOne(options);
    if (!user) {
      throw new NotFoundException(
        `User with options #${JSON.stringify(options)} not found`,
      );
    }
    return user;
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    const existingUser = await this.usersRepository.preload({
      id,
      ...user,
    });
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.usersRepository.save(existingUser);
  }

  async deleteUser(id: string): Promise<string> {
    const user = await this.getUser({ where: { id } });
    await this.usersRepository.remove(user);
    return id;
  }
}
