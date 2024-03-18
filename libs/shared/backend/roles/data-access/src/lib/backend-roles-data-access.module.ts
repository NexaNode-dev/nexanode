import { Module } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.enity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesRepository],
  exports: [RolesRepository, TypeOrmModule],
})
export class BackendRolesDataAccessModule {}
