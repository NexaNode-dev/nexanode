import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@nexanode/tijdenlangverhaald-frontend-landing-feature').then(
        (m) => m.TijdenlangverhaaldLandingComponent,
      ),
  },
  {
    path: 'over-ons',
    loadComponent: () =>
      import('@nexanode/tijdenlangverhaald-frontend-about-feature').then(
        (m) => m.TijdenlangverhaaldAboutComponent,
      ),
  },
  {
    path: 'aanbod',
    loadComponent: () =>
      import('@nexanode/tijdenlangverhaald-frontend-services-feature').then(
        (m) => m.TijdenlangverhaaldServicesComponent,
      ),
  },
];
