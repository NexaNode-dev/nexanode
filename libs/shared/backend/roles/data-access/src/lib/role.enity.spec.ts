import { Role } from './role.enity';

describe('RoleEnity', () => {
  it('should be defined', () => {
    expect(new Role({})).toBeDefined();
  });
  it('should have required properties', () => {
    const role = new Role({ name: 'admin' });
    expect(role.name).toBe('admin');
  });
});