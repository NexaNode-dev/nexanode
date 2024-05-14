import { Route } from '@angular/router';

export const stoicFrontendLandingFeatureRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./landing.component').then((m) => m.LandingComponent),
  },
];
