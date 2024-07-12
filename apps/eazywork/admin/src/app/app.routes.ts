import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@nexanode/admin-auth-feature').then(
        (m) => m.adminAuthFeatureRoutes,
      ),
  },
  {
    path: 'job-offers',
    loadChildren: () =>
      import('@nexanode/admin-job-offers-feature').then(
        (m) => m.adminJobOffersFeatureRoutes,
      ),
  },
];
