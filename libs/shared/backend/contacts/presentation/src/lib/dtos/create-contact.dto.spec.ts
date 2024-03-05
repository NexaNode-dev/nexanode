import { CreateContactDto } from './create-contact.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { faker } from '@faker-js/faker';

describe('CreateContactDto', () => {
  it('should be defined', () => {
    expect(new CreateContactDto()).toBeDefined();
  });
  it('should validate the name property is not empty', async () => {
    const contact = plainToInstance(CreateContactDto, {
      email: faker.internet.email(),
      message: faker.lorem.sentence(),
    });
    const errors = await validate(contact);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('name');
  });
  it('should validate the email property is not empty', async () => {
    const contact = plainToInstance(CreateContactDto, {
      name: faker.person.fullName(),
      message: faker.lorem.sentence(),
    });
    const errors = await validate(contact);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('email');
  });
  it('should validate the message property is not empty', async () => {
    const contact = plainToInstance(CreateContactDto, {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });
    const errors = await validate(contact);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('message');
  });
  it('should validate the email property is a valid email', async () => {
    const contact = plainToInstance(CreateContactDto, {
      name: faker.person.fullName(),
      email: 'invalid-email',
      message: faker.lorem.sentence(),
    });
    const errors = await validate(contact);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('email');
  });
  it('should validate the url propery is a valid url', async () => {
    const contact = plainToInstance(CreateContactDto, {
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
    const contact = plainToInstance(CreateContactDto, {
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
