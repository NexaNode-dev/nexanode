import { Service } from './service.entity';
import { faker } from '@faker-js/faker';

describe('Service', () => {
  it('should be defined', () => {
    expect(new Service({})).toBeDefined();
  });
  it('should have required properties', () => {
    const service = new Service({
      name: faker.lorem.words(3),
      summary: faker.lorem.words(5),
    });
    expect(service.id).toBeDefined();
    expect(service.name).toBeDefined();
    expect(service.summary).toBeDefined();
  });
});
