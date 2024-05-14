import { RawRule } from '@casl/ability';
import { SetMetadata } from '@nestjs/common';

export const RBAC = 'rbac:checkPermission';

export const Rbac = (...requirements: RawRule[]) =>
  SetMetadata(RBAC, requirements);
