import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ServicesService } from '@nexanode/optimalist-frontend-services-data-access';
import { computed, inject } from '@angular/core';

interface IService {
  id: string;
  title: string;
  summary: string;
  description: string;
  icon: string;
  coverImage: string;
}

type ServicesState = {
  services: IService[];
  loading: boolean;
  selectedId: string | null;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: ServicesState = {
  services: [],
  loading: false,
  selectedId: null,
  filter: {
    query: '',
    order: 'asc',
  },
};

export const ServicesStore = signalStore(
  withState(initialState),
  withMethods((store, servicesService = inject(ServicesService)) => ({
    async getServices() {
      patchState(store, { loading: true });
      const services = await servicesService.getServices();
      patchState(store, { loading: false, services });
    },
    async getServiceById(id: string) {
      patchState(store, { loading: true });
      let service = store.services().find((s) => s.id === id);
      if (!service) {
        service = await servicesService.getServiceById(id);
        patchState(store, (state) => ({
          loading: false,
          services: [...state.services, service!],
          selectedId: service?.id,
        }));
      } else {
        patchState(store, { selectedId: service.id });
      }
    },
  })),
  withComputed((store) => ({
    selectedService: computed(() =>
      store.services().filter((s) => s.id === store.selectedId()),
    ),
  })),
);