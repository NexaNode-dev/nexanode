import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { authStore } from '@nexanode/frontend-iam-ng-state';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(authStore);
  const router = inject(Router);
  if (store.isLoggedIn()) {
    const token = store.user()?.accessToken;
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        if (store.isLoggedIn()) {
          store.logout();
        }
        router.navigate(['/admin/auth/login']);
      } else if (err.status === 403) {
        if (store.isLoggedIn()) {
          router.navigate(['/forbidden']);
        } else {
          router.navigate(['/admin/auth/login']);
        }
      }
      return throwError(() => err);
    }),
  );
};
