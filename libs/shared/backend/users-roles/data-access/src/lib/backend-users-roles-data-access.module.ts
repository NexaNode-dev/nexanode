import { Module } from '@nestjs/common';
import { UsersRolesRepository } from './users-roles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  providers: [UsersRolesRepository],
  exports: [UsersRolesRepository, TypeOrmModule],
})
export class BackendUsersRolesDataAccessModule {}
