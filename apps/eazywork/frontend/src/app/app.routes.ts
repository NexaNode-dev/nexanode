import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'job-offers',
    pathMatch: 'full',
  },
  {
    path: 'job-offers',
    loadChildren: () =>
      import('@nexanode/frontend-job-offers-ng-feature').then(
        (m) => m.jobOffersRoutes,
      ),
  },
];
