import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { ICategory, IService } from '@nexanode/domain-interfaces';
import { ServicesService } from '@nexanode/frontend-services-ng-data-access';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, of, pipe, switchMap, tap } from 'rxjs';

type ServicesSate = {
  services: IService[];
  categories: ICategory[];
  selectedId: string | null;
  selectedCategoryId: string | null;
  isLoading: boolean;
  error: unknown | null;
};

const initialState: ServicesSate = {
  services: [],
  categories: [],
  selectedId: null,
  selectedCategoryId: null,
  isLoading: false,
  error: null,
};

export const servicesStore = signalStore(
  { providedIn: 'root' },
  withDevtools('services'),
  withState(initialState),
  withComputed((state) => ({
    selectedService: computed(() =>
      state.services().find((s) => s.id === state.selectedId()),
    ),
    selectedCategory: computed(() =>
      state.categories().find((c) => c.id === state.selectedCategoryId()),
    ),
    servicesForSelectedCategory: computed(() =>
      state
        .services()
        .filter((s) => s.categoryId === state.selectedCategoryId()),
    ),
  })),
  withMethods((store, servicesService = inject(ServicesService)) => ({
    getServices: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          servicesService.getServices().pipe(
            tapResponse({
              next: (services) => patchState(store, { services }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    getService: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap((id) => {
          const service = store.services().find((s) => s.id === id);
          if (service) {
            return of(
              patchState(store, { selectedId: service.id, isLoading: false }),
            );
          } else {
            return servicesService.getService(id).pipe(
              tapResponse({
                next: (service) =>
                  patchState(store, (state) => ({
                    services: [...state.services, service],
                    selectedId: service.id,
                  })),
                error: (error) => patchState(store, { error }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            );
          }
        }),
      ),
    ),
    createService: rxMethod<Partial<IService>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((service) =>
          servicesService.createService(service).pipe(
            tapResponse({
              next: (service) =>
                patchState(store, {
                  services: [...store.services(), service],
                  selectedId: service.id,
                }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    updateService: rxMethod<Partial<IService>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((service) =>
          servicesService.updateService(service).pipe(
            tapResponse({
              next: (service) =>
                patchState(store, {
                  services: store
                    .services()
                    .map((s) => (s.id === service.id ? service : s)),
                  selectedId: service.id,
                }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    deleteService: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) =>
          servicesService.deleteService(id).pipe(
            tapResponse({
              next: () =>
                patchState(store, {
                  services: store.services().filter((s) => s.id !== id),
                  selectedId: null,
                }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    getServicesByCategory: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((categoryId) =>
          servicesService.getServicesByCategory(categoryId).pipe(
            tapResponse({
              next: (services) => patchState(store, { services }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    getCategories: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          servicesService.getCategories().pipe(
            tapResponse({
              next: (categories) => patchState(store, { categories }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    getCategory: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap((id) => {
          const category = store.categories().find((c) => c.id === id);
          if (category) {
            return of(
              patchState(store, {
                selectedCategoryId: category.id,
                isLoading: false,
              }),
            );
          } else {
            return servicesService.getCategory(id).pipe(
              tapResponse({
                next: (category) =>
                  patchState(store, (state) => ({
                    categories: [...state.categories, category],
                    selectedCategoryId: category.id,
                  })),
                error: (error) => patchState(store, { error }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            );
          }
        }),
      ),
    ),
    createCategory: rxMethod<Partial<ICategory>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((category) =>
          servicesService.createCategory(category).pipe(
            tapResponse({
              next: (category) =>
                patchState(store, {
                  categories: [...store.categories(), category],
                  selectedCategoryId: category.id,
                }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    updateCategory: rxMethod<Partial<ICategory>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((category) =>
          servicesService.updateCategory(category).pipe(
            tapResponse({
              next: (category) =>
                patchState(store, {
                  categories: store
                    .categories()
                    .map((c) => (c.id === category.id ? category : c)),
                  selectedCategoryId: category.id,
                }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    deleteCategory: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) =>
          servicesService.deleteCategory(id).pipe(
            tapResponse({
              next: () =>
                patchState(store, {
                  categories: store.categories().filter((c) => c.id !== id),
                  selectedCategoryId: null,
                }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.getServices();
      store.getCategories();
    },
  }),
);
