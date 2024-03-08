import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path:'',
    loadChildren: () => import('@nexanode/optimalist-frontend-landing-feature').then(m => m.optimalistFrontendLandingFeatureRoutes)
  }
];
