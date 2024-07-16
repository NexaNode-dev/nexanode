import { Module } from '@nestjs/common';
import { RolesPermissionsRepository } from './roles-permissions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from './role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission])],
  providers: [RolesPermissionsRepository],
  exports: [RolesPermissionsRepository, TypeOrmModule],
})
export class BackendRolesPermissionsDataAccessModule {}
