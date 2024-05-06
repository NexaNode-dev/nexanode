import { computed, inject } from '@angular/core';
import { IContact } from '@nexanode/domain-interfaces';
import { ContactsService } from '@nexanode/frontend-contacts-ng-data-access';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { mergeMap, of, pipe, switchMap, tap } from 'rxjs';

type ContactsState = {
  contacts: IContact[];
  selectedId: string | null;
  isLoading: boolean;
  error: unknown | null;
};

const initialState: ContactsState = {
  contacts: [],
  selectedId: null,
  isLoading: false,
  error: null,
};

export const ContactsState = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    selectedContact: computed(() =>
      state.contacts().find((contact) => contact.id === state.selectedId()),
    ),
  })),
  withMethods((store, contactsService = inject(ContactsService)) => ({
    getContacts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          contactsService.getContacts().pipe(
            tapResponse({
              next: (contacts) => patchState(store, { contacts }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    getContact: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap((id) => {
          const contact = store.contacts().find((c) => c.id === id);
          if (contact) {
            return of(patchState(store, { selectedId: id, isLoading: false }));
          } else {
            return contactsService.getContact(id).pipe(
              tapResponse({
                next: (contact) =>
                  patchState(store, (state) => ({
                    selectedId: contact.id,
                    contacts: [...state.contacts, contact],
                  })),
                error: (error) => patchState(store, { error }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            );
          }
        }),
      ),
    ),
    createContact: rxMethod<Partial<IContact>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((contact) =>
          contactsService.createContact(contact).pipe(
            tapResponse({
              next: (contact) =>
                patchState(store, (state) => ({
                  contacts: [...state.contacts, contact],
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    updateContact: rxMethod<Partial<IContact>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((contact) =>
          contactsService.updateContact(contact).pipe(
            tapResponse({
              next: (contact) =>
                patchState(store, (state) => ({
                  contacts: state.contacts.map((c) =>
                    c.id === contact.id ? contact : c,
                  ),
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    deleteContact: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) =>
          contactsService.deleteContact(id).pipe(
            tapResponse({
              next: () =>
                patchState(store, (state) => ({
                  contacts: state.contacts.filter((c) => c.id !== id),
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
  })),
);
