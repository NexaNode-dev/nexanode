import { Event } from './event.entity';
import { faker } from '@faker-js/faker';

describe('Event', () => {
  it('should be defined', () => {
    expect(new Event({})).toBeDefined();
  });
  it('should have the required properties', () => {
    const event = new Event({
      name: faker.lorem.words(),
      from: faker.date.recent(),
      location: faker.location.city(),
      units: faker.number.int(),
      unitType: faker.lorem.word(),
      unitCapacity: faker.number.int(),
      recurring: faker.datatype.boolean(),
    });
    expect(event.id).toBeDefined();
    expect(event.name).toBeDefined();
    expect(event.from).toBeDefined();
    expect(event.location).toBeDefined();
    expect(event.units).toBeDefined();
    expect(event.unitType).toBeDefined();
    expect(event.unitCapacity).toBeDefined();
    expect(event.recurring).toBeDefined();
  });
});
