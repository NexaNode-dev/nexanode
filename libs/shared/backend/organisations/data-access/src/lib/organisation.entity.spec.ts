import { faker } from '@faker-js/faker';
import { Organisation } from './organisation.entity';

describe('Organisation', () => {
  it('should be defined', () => {
    expect(new Organisation({})).toBeDefined();
  });
  it('should have the required properties', () => {
    const organisation = new Organisation({
      name: faker.company.name(),
      typeId: faker.string.uuid(),
    });
    expect(organisation).toHaveProperty('id');
    expect(organisation).toHaveProperty('name');
    expect(organisation).toHaveProperty('typeId');
  });
});
