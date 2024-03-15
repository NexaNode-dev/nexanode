import { faker } from '@faker-js/faker';
import { User } from './user.entity';

describe('UserEntity', () => {
  it('should be defined', () => {
    expect(new User({})).toBeDefined();
  });
  it('should have the required properties', () => {
    const user = new User({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    });
    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.password).toBeDefined();
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
  });
});
