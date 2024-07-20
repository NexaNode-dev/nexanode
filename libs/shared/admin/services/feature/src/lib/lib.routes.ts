import { Route } from "@angular/router";

export const adminServicesFeatureRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./list/list.component').then(m => m.NexanodeAdminServicesListComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('./form/form.component').then(m => m.NexanodeAdminServicesFormComponent),
  },
  {
    path:'update/:id',
    loadComponent: () => import('./form/form.component').then(m => m.NexanodeAdminServicesFormComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./detail/detail.component').then(m => m.NexanodeAdminServicesDetailComponent),
  },
  {
    path: 'categories',
    children: [
      {
        path: '',
        loadComponent: () => import('./categories/list/categories-list.component').then(m => m.NexanodeAdminServicesCategoriesListComponent),
      },
      {
        path: 'create',
        loadComponent: () => import('./categories/form/categories-form.component').then(m => m.NexanodeAdminServicesCategoriesFormComponent),
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./categories/form/categories-form.component').then(m => m.NexanodeAdminServicesCategoriesFormComponent),
      },
      {
        path: ':id',
        loadComponent: () => import('./categories/detail/categories-detail.component').then(m => m.NexanodeAdminServicesCategoriesDetailComponent),
      }
    ]
  }
]