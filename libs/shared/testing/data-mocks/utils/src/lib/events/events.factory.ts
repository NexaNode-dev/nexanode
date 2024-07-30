import { IEvent } from '@nexanode/domain-interfaces';
import { faker } from '@faker-js/faker';

export const eventFactory = (options: Partial<IEvent> = {}): IEvent => {
  const recurring = faker.datatype.boolean();
  const event = {
    id: faker.string.uuid(),
    name: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(),
    from: faker.date.soon(),
    to: faker.datatype.boolean() ? faker.date.future() : undefined,
    location: `${faker.location.city()}, ${faker.location.country()}`,
    units: faker.number.int({ min: 1, max: 20 }),
    unitType: faker.helpers.arrayElement(['table', 'seat', 'person']) as
      | 'table'
      | 'seat'
      | 'person',
    unitCapacity: faker.number.int({ min: 1, max: 10 }),
    price: faker.datatype.boolean()
      ? faker.number.float({ min: 5, max: 500 })
      : undefined,
    serviceId: faker.string.uuid(),
    recurring,
    interval: recurring ? faker.number.int({ min: 1, max: 5 }) : undefined,
    intervalUnit: recurring
      ? (faker.helpers.arrayElement(['day', 'week', 'month', 'year']) as
          | 'day'
          | 'week'
          | 'month'
          | 'year')
      : undefined,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };

  return { ...event, ...options };
};

export const eventsFactory = (
  count = 5,
  options: Partial<IEvent> = {},
): IEvent[] => {
  return Array.from({ length: count }, () => eventFactory(options));
};
