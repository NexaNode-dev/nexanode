import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { IService } from '@nexanode/domain-interfaces';
import { ServicesService } from '@nexanode/frontend-services-ng-data-access';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, of, pipe, switchMap, tap } from 'rxjs';

type ServicesSate = {
  services: IService[];
  selectedId: string | null;
  isLoading: boolean;
  error: unknown | null;
};

const initialState: ServicesSate = {
  services: [],
  selectedId: null,
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
  })),
);
