import { UserRole } from './user-role.entity';

describe('UserRole', () => {
  it('should be defined', () => {
    expect(new UserRole({})).toBeDefined();
  });
  it('should have required properties', () => {
    const userRole = new UserRole({
      userId: '1',
      roleId: '1',
    });
    expect(userRole.id).toBeDefined();
    expect(userRole.userId).toBe('1');
    expect(userRole.roleId).toBe('1');
  });
});
