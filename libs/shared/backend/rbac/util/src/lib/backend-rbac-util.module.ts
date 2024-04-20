import { Module } from '@nestjs/common';
import { RbacFactory } from './factories/rbac.factory';
import { RbacGuard } from './rbac.guard';
import { BackendUsersRolesDataAccessModule } from '@nexanode/backend-users-roles-data-access';
import { BackendRolesPermissionsDataAccessModule } from '@nexanode/backend-roles-permissions-data-access';
import { BackendPermissionsDataAccessModule } from '@nexanode/backend-permissions-data-access';
import { BackendUsersDataAccessModule } from '@nexanode/backend-users-data-access';

@Module({
  imports: [
    BackendUsersDataAccessModule,
    BackendUsersRolesDataAccessModule,
    BackendRolesPermissionsDataAccessModule,
    BackendPermissionsDataAccessModule,
  ],
  providers: [RbacFactory, RbacGuard],
  exports: [RbacFactory, RbacGuard],
})
export class BackendRbacUtilModule {}
