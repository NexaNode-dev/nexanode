import { faker } from '@faker-js/faker';
import { IPermission } from '@nexanode/domain-interfaces';

export const permissionFactory = (
  options?: Partial<IPermission>,
): IPermission => {
  const permission: IPermission = {
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    action: faker.lorem.word(),
    subject: faker.lorem.word(),
    conditions: faker.datatype.json().toString(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  return { ...permission, ...options };
};

export const permissionsFactory = (
  count = 20,
  options?: Partial<IPermission>,
): IPermission[] => {
  return Array.from({ length: count }, () => permissionFactory(options));
};
