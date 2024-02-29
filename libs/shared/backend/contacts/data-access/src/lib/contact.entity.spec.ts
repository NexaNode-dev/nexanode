import { Contact } from './contact.entity';
import { faker } from '@faker-js/faker';

describe('ContactEntity', () => {
  it('should be defined', () => {
    expect(new Contact({})).toBeDefined();
  });
  it('should have the required properties', () => {
    const contact = new Contact({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      message: faker.lorem.sentence(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    });
    expect(contact.id).toBeDefined();
    expect(contact.name).toBeDefined();
    expect(contact.email).toBeDefined();
    expect(contact.message).toBeDefined();
    expect(contact.createdAt).toBeDefined();
    expect(contact.updatedAt).toBeDefined();
  });
});
