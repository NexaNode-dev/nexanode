import { faker } from '@faker-js/faker';
import { IRole } from '@nexanode/domain-interfaces';

export const roleFactory = (options?: Partial<IRole>): IRole => {
  const role: IRole = {
    id: faker.string.uuid(),
    name: faker.person.jobTitle(),
    description: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  return { ...role, ...options };
};

export const rolesFactory = (count = 10, options?: Partial<IRole>): IRole[] => {
  return Array.from({ length: count }, () => roleFactory(options));
};
