import { faker } from '@faker-js/faker';
import { IService } from '@nexanode/domain-interfaces';

export const serviceFactory = (options?: Partial<IService>): IService => {
  const service: IService = {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    summary: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    price: faker.number.float({ min: 1, max: 100 }),
    category: faker.commerce.department(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  return { ...service, ...options };
};

export const servicesFactory = (
  count = 10,
  options?: Partial<IService>,
): IService[] => {
  return Array.from({ length: count }, () => serviceFactory(options));
};
