import { Category } from './category.entity';
import { faker } from '@faker-js/faker';

describe('Category', () => {
  it('should be defined', () => {
    expect(new Category({})).toBeDefined();
  });
  it('should set table name', () => {
    Category.setTableName('prefix');
    expect(Reflect.getMetadata('tableName', Category)).toBe(
      'prefix_categories',
    );
  });
  it('should have the required properties', () => {
    const category = new Category({
      name: faker.lorem.word(),
    });
    expect(category.id).toBeDefined();
    expect(category.name).toBeDefined();
  });
});