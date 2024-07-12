import { Route } from '@angular/router';

export const jobOffersRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./list/list.component').then(
        (m) => m.NexanodeJobOffersListComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail/detail.component').then(
        (m) => m.NexanodeJobOffersDetailComponent,
      ),
  },
];
