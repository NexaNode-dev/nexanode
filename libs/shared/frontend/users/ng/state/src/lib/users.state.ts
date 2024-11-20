import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { IQueryParams, IUser } from '@nexanode/domain-interfaces';
import { UsersService } from '@nexanode/frontend-users-ng-data-access';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, of, pipe, switchMap, tap } from 'rxjs';

type UsersState = {
  users: IUser[];
  selectedId: string | null;
  isLoading: boolean;
  error: unknown | null;
  query: IQueryParams<IUser>;
};

const initialState: UsersState = {
  users: [],
  selectedId: null,
  isLoading: false,
  error: null,
  query: {},
};

export const usersStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withDevtools('Users'),
  withState(initialState),
  withComputed((state) => ({
    selectedUser: computed(() =>
      state.users().find((user) => user.id === state.selectedId()),
    ),
  })),
  withMethods((store, usersService = inject(UsersService)) => ({
    getUsers: rxMethod<IQueryParams<IUser>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) =>
          usersService.getUsers(query).pipe(
            tapResponse({
              next: (users) => patchState(store, { users }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    getUser: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap((id) => {
          const user = store.users().find((u) => u.id === id);
          if (user) {
            return of(patchState(store, { selectedId: id, isLoading: false }));
          } else {
            return usersService.getUser(id).pipe(
              tapResponse({
                next: (user) =>
                  patchState(store, (state) => ({
                    selectedId: user.id,
                    users: [...state.users, user],
                  })),
                error: (error) => patchState(store, { error }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            );
          }
        }),
      ),
    ),
    createUser: rxMethod<Partial<IUser>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap((user) =>
          usersService.createUser(user).pipe(
            tapResponse({
              next: (user) =>
                patchState(store, (state) => ({
                  users: [...state.users, user],
                  selectedId: user.id,
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    updateUser: rxMethod<{ id: string; user: Partial<IUser> }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap(({ id, user }) =>
          usersService.updateUser(id, user).pipe(
            tapResponse({
              next: (user) =>
                patchState(store, (state) => ({
                  users: state.users.map((u) => (u.id === user.id ? user : u)),
                  selectedId: user.id,
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    deleteUser: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap((id) =>
          usersService.deleteUser(id).pipe(
            tapResponse({
              next: (id) =>
                patchState(store, (state) => ({
                  users: state.users.filter((u) => u.id !== id),
                  selectedId: null,
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    clearSelectedUser: () => patchState(store, { selectedId: null }),
    updateQuery: (query: IQueryParams<IUser>) =>
      patchState(store, { query: { ...store.query(), ...query } }),
  })),
  withHooks({
    onInit({ getUsers, query }) {
      getUsers(query());
    },
  }),
);
