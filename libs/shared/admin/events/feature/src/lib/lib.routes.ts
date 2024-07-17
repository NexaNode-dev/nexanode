import { Route } from "@angular/router";

export const adminEventRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./list/list.component').then(m => m.NexanodeAdminEventsListComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('./form/form.component').then(m => m.NexanodeAdminEventsFormComponent),
  },
  {
    path: 'update/:id',
    loadComponent: () => import('./form/form.component').then(m => m.NexanodeAdminEventsFormComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./detail/detail.component').then(m => m.NexanodeAdminEventsDetailComponent),
  }
];