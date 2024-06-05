import { ICategory } from '@nexanode/domain-interfaces';
import { faker } from '@faker-js/faker';

export const categoryFactory = (options?: Partial<ICategory>): ICategory => {
  const category: ICategory = {
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  return { ...category, ...options };
};

export const categoriesFactory = (
  count = 5,
  options?: Partial<ICategory>,
): ICategory[] => {
  return Array.from({ length: count }, () => categoryFactory(options));
};
