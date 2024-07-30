import { Booking } from './booking.entity';
import { faker } from '@faker-js/faker';

describe('Booking', () => {
  it('should be defined', () => {
    expect(new Booking()).toBeDefined();
  });
  it('should have the required properties', () => {
    const booking = new Booking({
      reference: faker.string.uuid(),
      eventId: faker.string.uuid(),
      status: 'pending',
      userId: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });
    expect(booking).toHaveProperty('id');
    expect(booking).toHaveProperty('reference');
    expect(booking).toHaveProperty('eventId');
    expect(booking).toHaveProperty('status');
    expect(booking).toHaveProperty('userId');
    expect(booking).toHaveProperty('name');
    expect(booking).toHaveProperty('email');
  });
});
