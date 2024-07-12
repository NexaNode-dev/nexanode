import { Route } from '@angular/router';

export const adminJobOffersFeatureRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./list/list.component').then(
        (m) => m.NexanodeAdminJobOffersListComponent,
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./form/form.component').then(
        (m) => m.NexanodeAdminJobOffersFormComponent,
      ),
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./form/form.component').then(
        (m) => m.NexanodeAdminJobOffersFormComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail/detail.component').then(
        (m) => m.NexanodeAdminJobOffersDetailComponent,
      ),
  },
];
