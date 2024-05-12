import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@nexanode/lifeperformance-frontend-landing-feature').then(
        (m) => m.LandingComponent,
      ),
  },
];
