import { IUser } from '@nexanode/domain-interfaces';
import { faker } from '@faker-js/faker';

export const userFactory = (options?: Partial<IUser>): IUser => {
  const user: IUser = {
    id: faker.string.uuid(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    accessToken: faker.string.nanoid(),
    refreshToken: faker.string.nanoid(),
    loginExpires: faker.date.future(),
    isActive: faker.datatype.boolean(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  return { ...user, ...options };
};

export const usersFactory = (count = 5, options?: Partial<IUser>): IUser[] => {
  return Array.from({ length: count }, () => userFactory(options));
};
