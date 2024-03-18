import { Module } from '@nestjs/common';
import { RolesRepository } from './roles.repository';

@Module({
  controllers: [],
  providers: [RolesRepository],
  exports: [],
})
export class BackendRolesDataAccessModule {}
