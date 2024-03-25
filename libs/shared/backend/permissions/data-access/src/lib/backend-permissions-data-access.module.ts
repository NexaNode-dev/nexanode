import { Module } from '@nestjs/common';
import { PermissionsRepository } from './permissions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionsRepository],
  exports: [PermissionsRepository, TypeOrmModule],
})
export class BackendPermissionsDataAccessModule {}
