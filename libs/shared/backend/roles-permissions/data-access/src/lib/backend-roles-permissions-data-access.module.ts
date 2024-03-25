import { Module } from '@nestjs/common';
import { RolesPermissionsRepository } from './roles-permissions.repository';

@Module({
  controllers: [],
  providers: [RolesPermissionsRepository],
  exports: [],
})
export class BackendRolesPermissionsDataAccessModule {}
