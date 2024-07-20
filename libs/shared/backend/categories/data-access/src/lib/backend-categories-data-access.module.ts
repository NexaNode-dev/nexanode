import { Inject, Module } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import {
  CATEGORY_MODULE_OPTIONS,
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './backend-categories-data-access.module.definition';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';

@Module({})
export class BackendCategoriesDataAccessModule extends ConfigurableModuleClass {
  constructor(
    @Inject(CATEGORY_MODULE_OPTIONS) private options: typeof OPTIONS_TYPE,
  ) {
    super();
  }

  static register(options: typeof OPTIONS_TYPE) {
    return {
      ...super.register(options),
      imports: [TypeOrmModule.forFeature([Category])],
      providers: [
        {
          provide: CATEGORY_MODULE_OPTIONS,
          useValue: options,
        },
        CategoriesRepository,
      ],
      exports: [CategoriesRepository, TypeOrmModule],
    };
  }
}
