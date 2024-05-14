import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@nexanode/stoic-frontend-landing-feature').then(
        (m) => m.stoicFrontendLandingFeatureRoutes,
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('@nexanode/stoic-frontend-about-feature').then(
        (m) => m.stoicFrontendAboutFeatureRoutes,
      ),
  },
];
