import { faker } from '@faker-js/faker';
import { IJobOffer } from '@nexanode/domain-interfaces';

export const jobOfferFactory = (options?: Partial<IJobOffer>): IJobOffer => {
  const jobOffer: IJobOffer = {
    id: faker.string.uuid(),
    companyId: faker.string.uuid(),
    title: faker.lorem.words(),
    description: faker.lorem.paragraphs(),
    location: faker.location.city(),
    salaryLow: faker.number.float(),
    salaryHigh: faker.number.float(),
    employmentType: faker.helpers.arrayElement(['permanent', 'contract']),
    workTime: faker.helpers.arrayElement(['full-time', 'part-time']),
    jobLevel: faker.helpers.arrayElement([
      'junior',
      'medior',
      'senior',
      'principal',
    ]),
    status: faker.helpers.arrayElement(['open', 'closed']),
    requirements: faker.lorem.paragraphs(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  return { ...jobOffer, ...options };
};

export const jobOffersFactory = (
  count = 5,
  options?: Partial<IJobOffer>[],
): IJobOffer[] => {
  return Array.from({ length: count }, (_, i) =>
    jobOfferFactory(options ? options[i] : undefined),
  );
};
