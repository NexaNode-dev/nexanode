import { Injectable } from '@nestjs/common';
import { IPermission } from '@nexanode/domain-interfaces';
import { AbilityBuilder, Ability } from '@casl/ability';

@Injectable()
export class RbacFactory {
  createRbac(permissions: IPermission[]) {
    const { can, build } = new AbilityBuilder(Ability);

    permissions.forEach((permission) => {
      can(permission.action, permission.subject, permission.conditions);
    });
    return build();
  }
}
