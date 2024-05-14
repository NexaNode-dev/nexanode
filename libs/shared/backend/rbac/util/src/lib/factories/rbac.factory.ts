import { Injectable } from '@nestjs/common';
import { IPermission } from '@nexanode/domain-interfaces';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';

@Injectable()
export class RbacFactory {
  createRbac(permissions: IPermission[]) {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    permissions.forEach((permission) => {
      const conditions = permission.conditions
        ? JSON.parse(permission.conditions)
        : {};
      can(permission.action, permission.subject, undefined, conditions);
    });
    return build();
  }
}
