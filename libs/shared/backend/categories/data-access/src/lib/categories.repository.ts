import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesRepository extends Repository<Category> {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {
    super(
      Category,
      categoriesRepository.manager,
      categoriesRepository.queryRunner,
    );
  }

  getCategories(options: FindManyOptions<Category> = {}): Promise<Category[]> {
    return this.categoriesRepository.find(options);
  }

  async getCategory(options: FindOneOptions<Category>): Promise<Category> {
    const category = await this.categoriesRepository.findOne(options);
    if (!category) {
      throw new NotFoundException(
        `Categgory with options ${JSON.stringify(options)} not found`,
      );
    }
    return category;
  }

  createCategory(category: Partial<Category>): Promise<Category> {
    const newCategory = this.categoriesRepository.create(category);
    return this.categoriesRepository.save(newCategory);
  }

  async updateCategory(
    id: string,
    category: Partial<Category>,
  ): Promise<Category> {
    const updatedCategory = await this.categoriesRepository.preload({
      id,
      ...category,
    });
    if (!updatedCategory) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return this.categoriesRepository.save(updatedCategory);
  }

  async deleteCategory(id: string): Promise<string> {
    const category = await this.getCategory({ where: { id } });
    await this.categoriesRepository.remove(category);
    return id;
  }
}
