/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '@nexanode/backend-categories-data-access';
import { ServicesRepository } from '@nexanode/backend-services-data-access';
import { ICategory, IService } from '@nexanode/domain-interfaces';

@Injectable()
export class ServicesService {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async getServices(options?: any): Promise<IService[]> {
    return this.servicesRepository.getServices(options);
  }

  async getService(options?: any): Promise<IService> {
    return this.servicesRepository.getService(options);
  }

  async getServiceById(id: string): Promise<IService> {
    return this.servicesRepository.getService({ where: { id } });
  }

  async createService(service: Partial<IService>): Promise<IService> {
    return this.servicesRepository.createService(service);
  }

  async updateService(
    id: string,
    service: Partial<IService>,
  ): Promise<IService> {
    return this.servicesRepository.updateService(id, service);
  }

  async deleteService(id: string): Promise<string> {
    return this.servicesRepository.deleteService(id);
  }

  async getServicesByCategory(categoryId: string): Promise<IService[]> {
    return this.servicesRepository.getServices({ where: { categoryId } });
  }

  async getCategories(options?: any): Promise<ICategory[]> {
    return this.categoriesRepository.getCategories(options);
  }

  async getCategory(options?: any): Promise<ICategory> {
    return this.categoriesRepository.getCategory(options);
  }

  async getCategoryById(id: string): Promise<ICategory> {
    return this.categoriesRepository.getCategory({ where: { id } });
  }

  async createCategory(category: Partial<ICategory>): Promise<ICategory> {
    return this.categoriesRepository.createCategory(category);
  }

  async updateCategory(
    id: string,
    category: Partial<ICategory>,
  ): Promise<ICategory> {
    return this.categoriesRepository.updateCategory(id, category);
  }

  async deleteCategory(id: string): Promise<string> {
    return this.categoriesRepository.deleteCategory(id);
  }
}
