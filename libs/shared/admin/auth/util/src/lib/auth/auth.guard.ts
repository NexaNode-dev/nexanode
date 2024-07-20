import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { authStore } from '@nexanode/frontend-iam-ng-state';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  let ability: { action: string; subject: string } | null = null;
  const store = inject(authStore);
  const redirect = inject(Router).createUrlTree(['/auth/login'], {
    queryParams: { redirect: state.url },
  });
  if (!store.isLoggedIn()) {
    return redirect;
  }

  const urlSegments = childRoute.url.map((segment) => segment.path);
  let subject = state.url.split('/')[1].replace(/s$/, '');
  subject = subject.charAt(0).toUpperCase() + subject.slice(1);
  if (urlSegments.includes('create')) {
    ability = { action: 'create', subject };
  } else if (urlSegments.includes('update')) {
    ability = { action: 'update', subject };
  } else {
    ability = { action: 'read', subject };
  }

  return ability && store.canActivate(ability.action, ability.subject)
    ? true
    : redirect;
};
