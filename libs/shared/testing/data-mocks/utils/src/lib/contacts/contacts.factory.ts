import { faker } from '@faker-js/faker';
import { IContact } from '@nexanode/domain-interfaces';

export const contactFactory = (options?: Partial<IContact>): IContact => {
  const contact: IContact = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    url: faker.internet.url(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
    country: faker.location.country(),
    subject: faker.lorem.sentence(),
    message: faker.lorem.paragraph(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  return { ...contact, ...options };
};

export const contactsFactory = (
  count = 5,
  options?: Partial<IContact>,
): IContact[] => {
  return Array.from({ length: count }, () => contactFactory(options));
};
