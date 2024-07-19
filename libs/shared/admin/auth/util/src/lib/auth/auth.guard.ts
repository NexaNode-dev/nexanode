import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { authStore } from '@nexanode/frontend-iam-ng-state';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  let ability: { action: string; subject: string } | null = null;
  const store = inject(authStore);
  const redirect = inject(Router).createUrlTree(['/auth/login'], { queryParams: { redirect: state.url } });
  if (!store.isLoggedIn()) {
    return redirect;
  }

  const urlSegments = childRoute.url.map((segment) => segment.path);
  const adminIndex = urlSegments.indexOf('admin');
  if (adminIndex !== -1 && urlSegments.length > adminIndex + 1) {
    if (urlSegments.includes('create')) {
      ability = { action: 'create', subject: urlSegments[adminIndex + 1] };
    } else if (urlSegments.includes('update')) {
      ability = { action: 'update', subject: urlSegments[adminIndex + 1] };
    } else  {
      ability = { action: 'read', subject: urlSegments[adminIndex + 1] };
    }
  }
  
  return ability && store.canActivate(ability.action, ability.subject) ? true : redirect;
};

