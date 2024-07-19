import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@nexanode/eazywork-frontend-landing-feature').then(
        (m) => m.EazyWorkLandingComponent,
      ),
  },
  {
    path: 'job-offers',
    loadChildren: () =>
      import('@nexanode/frontend-job-offers-ng-feature').then(
        (m) => m.jobOffersRoutes,
      ),
  },
];
