import { IEvent } from '@nexanode/domain-interfaces';
import { faker } from '@faker-js/faker';

export const eventFactory = (options: Partial<IEvent> = {}): IEvent => {
  const event = {
    id: faker.string.uuid(),
    name: faker.lorem.words(),
    description: faker.lorem.sentence(),
    from: faker.date.recent(),
    to: faker.date.future(),
    location: faker.address.city(),
    units: faker.datatype.number(),
    unitType: faker.lorem.word(),
    unitCapacity: faker.datatype.number(),
    serviceId: faker.datatype.uuid(),
    recurring: faker.datatype.boolean(),
    interval: faker.datatype.number(),
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
  count: number,
  options: Partial<IEvent> = {},
): IEvent[] => {
  return Array.from({ length: count }, () => eventFactory(options));
};
