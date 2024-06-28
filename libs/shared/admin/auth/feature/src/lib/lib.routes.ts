import { Route } from '@angular/router';

export const adminAuthFeatureRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(
        (m) => m.NexaNodeAdminAuthLoginComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then(
        (m) => m.NexaNodeAdminAuthRegisterComponent,
      ),
  },
  {
    path: 'forgot',
    loadComponent: () =>
      import('./forgot/forgot.component').then(
        (m) => m.NexaNodeAdminAuthForgotComponent,
      ),
  },
  {
    path: 'reset/:token',
    loadComponent: () =>
      import('./reset/reset.component').then(
        (m) => m.NexaNodeAdminAuthResetComponent,
      ),
  },
  {
    path: 'activate/:id/:token',
    loadComponent: () =>
      import('./activate/activate.component').then(
        (m) => m.NexaNodeAdminAuthActivateComponent,
      ),
  },
];
