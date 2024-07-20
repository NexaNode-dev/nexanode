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
    path: 'services',
    loadChildren: () =>
      import('@nexanode/admin-services-feature').then(
        (m) => m.adminServicesFeatureRoutes,
      ),
    data: {
      nav: { label: 'Services', icon: 'room_service', path: 'services' },
    },
    canActivateChild: [authGuard],
  },
  {
    path: 'events',
    loadChildren: () =>
      import('@nexanode/admin-events-feature').then(
        (m) => m.adminEventsFeatureRoutes,
      ),
    data: { nav: { label: 'Events', icon: 'event', path: 'events' } },
    canActivateChild: [authGuard],
  },
];
