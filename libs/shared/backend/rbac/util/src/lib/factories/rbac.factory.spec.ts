import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { RbacFactory } from './rbac.factory';
import { IPermission } from '@nexanode/domain-interfaces';

describe('RbacFactory', () => {
  let provider: RbacFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RbacFactory],
    }).compile();

    provider = module.get<RbacFactory>(RbacFactory);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('createRbac', () => {
    it('should return an ability', () => {
      const permissions: IPermission[] = [
        {
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          action: 'create',
          subject: 'Post',
          conditions: '{ "userId": "1" }',
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
        {
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          action: 'read',
          subject: 'Post',
          conditions: '{ "userId": "1" }',
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
      ];
      const ability = provider.createRbac(permissions);
      expect(ability).toBeDefined();
    });
  });
});
