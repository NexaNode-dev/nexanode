import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@nexanode/frontend-nexanode-landing-feature').then(m => m.frontendNexanodeLandingFeatureRoutes)
  }
];
