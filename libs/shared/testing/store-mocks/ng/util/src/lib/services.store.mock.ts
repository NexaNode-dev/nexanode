import { signal } from '@angular/core';
import { ICategory, IService } from '@nexanode/domain-interfaces';
import {
  categoriesFactory,
  categoryFactory,
  serviceFactory,
  servicesFactory,
} from '@nexanode/testing-data-mocks-utils';

export class MockServicesStore {
  services = signal<IService[]>([]);
  categories = signal<ICategory[]>([]);
  selectedId = signal<string | null>(null);
  selectedCategoryId = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<unknown | null>(null);

  constructor() {
    this.getServices();
    this.getCategories();
  }

  selectedService = signal(
    this.services().find((s) => s.id === this.selectedId()),
  );
  selectedCategory = signal(
    this.categories().find((c) => c.id === this.selectedCategoryId()),
  );
  servicesForSelectedCategory = signal(
    this.services().filter((s) => s.categoryId === this.selectedCategoryId()),
  );

  getServices() {
    this.isLoading.set(true);
    this.services.set(servicesFactory());
    this.isLoading.set(false);
  }

  getService(id: string) {
    this.isLoading.set(true);
    const service = this.services().find((s) => s.id === id);
    if (service) {
      this.selectedId.set(service.id);
      console.log('service', service);
    } else {
      this.services.set([...this.services(), serviceFactory({ id })]);
      this.selectedId.set(id);
    }
    this.isLoading.set(false);
  }

  createService(service: Partial<IService>) {
    const newService = serviceFactory(service);
    this.isLoading.set(true);
    this.services.set([...this.services(), newService]);
    this.selectedId.set(newService.id);
    this.isLoading.set(false);
  }

  updateService(service: Partial<IService>) {
    this.isLoading.set(true);
    this.services.set(
      this.services().map((s) =>
        s.id === service.id ? { ...s, ...service } : s,
      ),
    );
    this.selectedId.set(service.id || this.selectedId());
    this.isLoading.set(false);
  }

  deleteService(id: string) {
    this.isLoading.set(true);
    this.services.set(this.services().filter((s) => s.id !== id));
    this.selectedId.set(null);
    this.isLoading.set(false);
  }

  getCategories() {
    this.isLoading.set(true);
    this.categories.set(categoriesFactory());
    this.isLoading.set(false);
  }

  getCategory(id: string) {
    this.isLoading.set(true);
    const category = this.categories().find((c) => c.id === id);
    if (category) {
      this.selectedCategoryId.set(category.id);
    } else {
      this.categories.set([...this.categories(), categoryFactory()]);
      this.selectedCategoryId.set(categoriesFactory()[0].id);
    }
    this.isLoading.set(false);
  }

  createCategory(category: Partial<ICategory>) {
    const newCategory = categoryFactory(category);
    this.isLoading.set(true);
    this.categories.set([...this.categories(), newCategory]);
    this.selectedCategoryId.set(newCategory.id);
    this.isLoading.set(false);
  }

  updateCategory(category: Partial<ICategory>) {
    this.isLoading.set(true);
    this.categories.set(
      this.categories().map((c) =>
        c.id === category.id ? { ...c, ...category } : c,
      ),
    );
    this.selectedCategoryId.set(category.id || this.selectedCategoryId());
    this.isLoading.set(false);
  }

  deleteCategory(id: string) {
    this.isLoading.set(true);
    this.categories.set(this.categories().filter((c) => c.id !== id));
    this.selectedCategoryId.set(null);
    this.isLoading.set(false);
  }
}
