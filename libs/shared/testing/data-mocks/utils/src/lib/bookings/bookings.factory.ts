import { faker } from '@faker-js/faker';
import { IBooking } from '@nexanode/domain-interfaces';

export const bookingFactory = (options?: Partial<IBooking>): IBooking => {
  const booking: IBooking = {
    id: faker.string.uuid(),
    reference: faker.string.uuid(),
    eventId: faker.string.uuid(),
    status: faker.helpers.arrayElement([
      'pending',
      'confirmed',
      'cancelled',
    ]) as 'pending' | 'confirmed' | 'cancelled',
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    units: faker.number.int({ min: 1, max: 10 }),
  };

  return { ...booking, ...options };
};

export const bookingsFactory = (
  count = 5,
  options?: Partial<IBooking>[],
): IBooking[] => {
  return Array.from({ length: count }, (_, i) =>
    bookingFactory(options ? options[i] : undefined),
  );
};
