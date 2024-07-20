import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesRepository } from './categories.repository';
import { categoriesFactory } from '@nexanode/testing-data-mocks-utils';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { NotFoundException } from '@nestjs/common';
import { CATEGORY_MODULE_OPTIONS } from './backend-categories-data-access.module.definition';

describe('CategoriesRepository', () => {
  let provider: CategoriesRepository;

  const expectedCategories = categoriesFactory();

  const expectedCategory = expectedCategories[0];

  const mockRepository = {
    find: jest.fn().mockResolvedValue(expectedCategories),
    findOne: jest.fn().mockResolvedValue(expectedCategory),
    create: jest.fn().mockReturnValue(expectedCategory),
    save: jest.fn().mockResolvedValue(expectedCategory),
    preload: jest.fn().mockResolvedValue(expectedCategory),
    remove: jest.fn().mockResolvedValue(expectedCategory),
    metadata: { tablePath: '', connection: {} },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesRepository],
    })
      .useMocker((token) => {
        if (token === getRepositoryToken(Category)) {
          return mockRepository;
        } else if (token === CATEGORY_MODULE_OPTIONS) {
          return { prefix: 'test' };
        }
        return;
      })
      .compile();

    provider = module.get<CategoriesRepository>(CategoriesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('getCategories', () => {
    it('should return all categories', async () => {
      const categories = await provider.getCategories();
      expect(categories).toEqual(expectedCategories);
    });
  });
  describe('getCategory', () => {
    it('should return a category', async () => {
      const category = await provider.getCategory({
        where: { id: expectedCategory.id },
      });
      expect(category).toEqual(expectedCategory);
    });
    it('should throw a NotFoundException', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      try {
        await provider.getCategory({ where: { id: 'not-found' } });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('createCategory', () => {
    it('should create a category', async () => {
      const category = await provider.createCategory(expectedCategory);
      expect(category).toEqual(expectedCategory);
    });
  });
  describe('updateCategory', () => {
    it('should update a category', async () => {
      const category = await provider.updateCategory(
        expectedCategory.id,
        expectedCategory,
      );
      expect(category).toEqual(expectedCategory);
    });
    it('should throw a NotFoundException', async () => {
      mockRepository.preload.mockResolvedValueOnce(null);
      try {
        await provider.updateCategory('not-found', expectedCategory);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('deleteCategory', () => {
    it('should delete a category', async () => {
      const id = await provider.deleteCategory(expectedCategory.id);
      expect(id).toEqual(expectedCategory.id);
    });
    it('should throw a NotFoundException', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      try {
        await provider.deleteCategory('not-found');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
