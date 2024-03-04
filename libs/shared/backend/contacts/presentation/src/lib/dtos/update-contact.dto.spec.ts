import { UpdateContactDto } from './update-contact.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { faker } from '@faker-js/faker';

describe('UpdateContactDto', () => {
  it('should be defined', () => {
    expect(new UpdateContactDto()).toBeDefined();
  });
  it('should validate the email property is a valid email', async () => {
    const contact = plainToInstance(UpdateContactDto, {
      name: faker.person.fullName(),
      email: 'invalid-email',
      message: faker.lorem.sentence(),
    });
    const errors = await validate(contact);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('email');
  });
  it('should validate the url propery is a valid url', async () => {
    const contact = plainToInstance(UpdateContactDto, {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      message: faker.lorem.sentence(),
      url: 'invalid-url',
    });
    const errors = await validate(contact);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('url');
  });
  it('should validate the phone property is a valid phone number', async () => {
    const contact = plainToInstance(UpdateContactDto, {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      message: faker.lorem.sentence(),
      phone: 'invalid-phone',
    });
    const errors = await validate(contact);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('phone');
  });
});
