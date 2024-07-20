import { Route } from '@angular/router';
import { authGuard } from '@nexanode/admin-auth-util';

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
    data: { nav: { label: 'Job Offers', icon: 'work', path: 'job-offers' } },
    canActivateChild: [authGuard],
  },
];
