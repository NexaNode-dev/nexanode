import { Route } from '@angular/router';

export const bookingsFeatureRoutes: Route[] = [
  {
    path: 'create',
    loadComponent: () =>
      import('./form/form.component').then(
        (m) => m.NexanodeBookingsFormComponent,
      ),
  },
  {
    path: 'status/:id',
    loadComponent: () =>
      import('./status/status.component').then(
        (m) => m.NexanodeBookingsStatusComponent,
      ),
  },
];
