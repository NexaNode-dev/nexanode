import { JobOffer } from './job-offer.entity';
import { faker } from '@faker-js/faker';

describe('JobOffer', () => {
  it('should be defined', () => {
    expect(new JobOffer({})).toBeDefined();
  });
  it('should have the required properties', () => {
    const jobOffer = new JobOffer({
      companyId: faker.string.uuid(),
      title: faker.person.jobTitle(),
      description: faker.lorem.paragraph(),
      location: faker.location.city(),
      salaryLow: faker.number.float({ fractionDigits: 2 }),
      employmentType: faker.helpers.arrayElement(['permanent', 'contract']),
      workTime: faker.helpers.arrayElement(['full-time', 'part-time']),
      jobLevel: faker.helpers.arrayElement([
        'junior',
        'medior',
        'senior',
        'principal',
      ]),
      status: faker.helpers.arrayElement(['open', 'closed']),
      requirements: faker.lorem.paragraph(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
    expect(jobOffer.id).toBeDefined();
    expect(jobOffer.companyId).toBeDefined();
    expect(jobOffer.title).toBeDefined();
    expect(jobOffer.description).toBeDefined();
    expect(jobOffer.location).toBeDefined();
    expect(jobOffer.salaryLow).toBeDefined();
    expect(jobOffer.employmentType).toBeDefined();
    expect(jobOffer.workTime).toBeDefined();
    expect(jobOffer.jobLevel).toBeDefined();
    expect(jobOffer.status).toBeDefined();
    expect(jobOffer.requirements).toBeDefined();
    expect(jobOffer.createdAt).toBeDefined();
    expect(jobOffer.updatedAt).toBeDefined();
  });
});
