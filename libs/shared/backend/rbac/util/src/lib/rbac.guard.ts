/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { RawRule } from '@casl/ability';
import { RbacFactory } from './factories/rbac.factory';
import { RBAC } from './decorators/rbac.decorator';
import { UsersRolesRepository } from '@nexanode/backend-users-roles-data-access';
import { RolesPermissionsRepository } from '@nexanode/backend-roles-permissions-data-access';
import { PermissionsRepository } from '@nexanode/backend-permissions-data-access';
import { IPermission, IUser } from '@nexanode/domain-interfaces';
import { UsersRepository } from '@nexanode/backend-users-data-access';

@Injectable()
export class RbacGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rbacFactory: RbacFactory,
    private readonly usersRepository: UsersRepository,
    private readonly usersRolesRepository: UsersRolesRepository,
    private readonly rolesPermissionsRepository: RolesPermissionsRepository,
    private readonly permissionsRepository: PermissionsRepository,
  ) {
    super();
  }
  override async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const rbac = this.reflector.getAllAndOverride<RawRule[]>(RBAC, [
      context.getHandler(),
      context.getClass(),
    ]);
    const { user } = context.switchToHttp().getRequest();
    const permissions = await this.resolvePermissions(user);
    const ability = this.rbacFactory.createRbac(permissions);
    return rbac.some((rule) =>
      ability.can(rule.action.toString(), rule.subject),
    );
  }

  private async resolvePermissions(
    user: IUser | undefined,
  ): Promise<IPermission[]> {
    if (!user) {
      user = await this.usersRepository.getUser({
        where: { name: 'Guest' },
      });
    }
    const userRoles = await this.usersRolesRepository.getUserRoles({
      where: { userId: user.id },
    });
    const rolePermissions =
      await this.rolesPermissionsRepository.getRolePermissions({
        where: userRoles.map((ur) => ({ roleId: ur.roleId })),
      });
    const permissions = await this.permissionsRepository.getPermissions({
      where: rolePermissions.map((rp) => ({ id: rp.permissionId })),
    });
    return permissions;
  }

  override handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    return user;
  }
}
