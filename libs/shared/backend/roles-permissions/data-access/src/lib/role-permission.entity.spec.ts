import { RolePermission } from './role-permission.entity';
import { faker } from '@faker-js/faker';

describe('RolePermission', () => {
  it('should be defined', () => {
    expect(new RolePermission({})).toBeDefined();
  });
  it('should have thre required fields', () => {
    const rolePermission = new RolePermission({
      roleId: faker.string.uuid(),
      permissionId: faker.string.uuid(),
    });
    expect(rolePermission.roleId).toBeDefined();
    expect(rolePermission.permissionId).toBeDefined();
    expect(rolePermission.id).toBeDefined();
  });
});
