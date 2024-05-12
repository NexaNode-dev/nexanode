import { faker } from '@faker-js/faker';
import { IUserProfile } from '@nexanode/domain-interfaces';

export const userProfileFactory = (
  options?: Partial<IUserProfile>,
): IUserProfile => {
  const userProfile: IUserProfile = {
    userId: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    displayName: faker.person.fullName(),
    biography: faker.lorem.paragraph(),
    profilePictureUrl: faker.internet.avatar(),
    phone: faker.phone.number(),
    dateOfBirth: faker.date.past(),
    gender: faker.person.gender(),
    websiteUrl: faker.internet.url(),
    socialMediaHandles: {
      twitter: faker.internet.userName(),
      facebook: faker.internet.userName(),
      instagram: faker.internet.userName(),
    },
    address: {
      street: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country(),
    },
    language: faker.lorem.word(),
    timezone: faker.lorem.word(),
    occupation: faker.person.jobTitle(),
    interests: Array.from({ length: 5 }, () => faker.lorem.word()),
    education: faker.lorem.sentence(),
    skills: Array.from({ length: 5 }, () => faker.lorem.word()),
  };

  return { ...userProfile, ...options };
};

export const userProfilesFactory = (
  count = 5,
  options?: Partial<IUserProfile>,
): IUserProfile[] => {
  return Array.from({ length: count }, () => userProfileFactory(options));
};
