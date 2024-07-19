import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { Ability, AbilityBuilder, createMongoAbility } from '@casl/ability';
import {
  ILogin,
  IPermission,
  IRegister,
  IUser,
} from '@nexanode/domain-interfaces';
import { AuthService } from '@nexanode/frontend-iam-ng-data-access';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

type AuthState = {
  user: IUser | null;
  isLoading: boolean;
  isRegistered: boolean;
  isActivated: boolean;
  isForgot: boolean;
  isReset: boolean;
  selectedId: string | null;
  error: unknown | null;
  ability: Ability | null;
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isRegistered: false,
  isActivated: false,
  isForgot: false,
  isReset: false,
  selectedId: null,
  error: null,
  ability: null,
};

export const authStore = signalStore(
  { providedIn: 'root' },
  withDevtools('Auth'),
  withState(initialState),
  withComputed((state) => ({
    isLoggedIn: computed(() => !!state.user()),
  })),
  withMethods((store, authService = inject(AuthService)) => ({
    register: rxMethod<IRegister>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((registerData) =>
          authService.register(registerData).pipe(
            tapResponse({
              next: (user) => patchState(store, { isRegistered: !!user }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    login: rxMethod<ILogin>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((loginData) =>
          authService.login(loginData).pipe(
            tapResponse({
              next: (loginResponse) => {
                const { user, permissions } = loginResponse;
                patchState(store, {
                  user,
                  ability: updateAbility(permissions),
                });
                localStorage.setItem(
                  'user',
                  JSON.stringify(loginResponse.user),
                );
              },
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    logout: () => {
      patchState(store, { user: null });
      localStorage.removeItem('user');
    },
    activate: rxMethod<{ id: string; token: string }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ id, token }) =>
          authService.activate(id, token).pipe(
            tapResponse({
              next: (isActivated) => patchState(store, { isActivated }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    forgotPassword: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((credential) =>
          authService.forgotPassword(credential).pipe(
            tapResponse({
              next: (isForgot) => patchState(store, { isForgot }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    resetPassword: rxMethod<{ token: string; password: string }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ token, password }) =>
          authService.resetPassword(token, password).pipe(
            tapResponse({
              next: (isReset) => patchState(store, { isReset }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    canActivate(action: string, subject: string ): boolean | undefined {
      return store.ability()?.can(action, subject);
    }
  })),
);

const updateAbility = (permissions: IPermission[]): Ability => {
  const { can, rules } = new AbilityBuilder(createMongoAbility);
  const ability = createMongoAbility();
  permissions.forEach((permission) => {
    const conditions = permission.conditions
      ? JSON.parse(permission.conditions)
      : undefined;
    can(permission.action, permission.subject, undefined, conditions);
  });
  ability.update(rules);

  return ability;
};
