import { IEvent } from '@nexanode/domain-interfaces';
import { faker } from '@faker-js/faker';

export const eventFactory = (options: Partial<IEvent> = {}): IEvent => {
  const event = {
    id: faker.string.uuid(),
    name: faker.lorem.words(),
    description: faker.lorem.sentence(),
    from: faker.date.recent(),
    to: faker.date.future(),
    location: faker.location.city(),
    units: faker.number.int(),
    unitType: faker.lorem.word(),
    unitCapacity: faker.number.int(),
    price: faker.number.float(),
    serviceId: faker.string.uuid(),
    recurring: faker.datatype.boolean(),
    interval: faker.number.int(),
    intervalUnit: faker.helpers.arrayElement([
      'day',
      'week',
      'month',
      'year',
    ]) as 'day' | 'week' | 'month' | 'year',
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
