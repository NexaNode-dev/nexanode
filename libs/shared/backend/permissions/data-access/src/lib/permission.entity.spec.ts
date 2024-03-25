import { Permission } from './permission.entity';
import { faker } from '@faker-js/faker';

describe('Permission', () => {
  it('should be defined', () => {
    expect(new Permission({})).toBeDefined();
  });
  it('should have the required properties', () => {
    const permission = new Permission({
      name: 'name',
      action: 'action',
      subject: 'subject',
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    });
    expect(permission.id).toBeDefined();
    expect(permission.name).toBe('name');
    expect(permission.action).toBe('action');
    expect(permission.subject).toBe('subject');
    expect(permission.createdAt).toBeInstanceOf(Date);
    expect(permission.updatedAt).toBeInstanceOf(Date);
  });
});
