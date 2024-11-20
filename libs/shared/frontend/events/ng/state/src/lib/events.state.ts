import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { IEvent } from '@nexanode/domain-interfaces';
import { EventsService } from '@nexanode/frontend-events-ng-data-access';
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

type EventsState = {
  events: IEvent[];
  selectedId: string | null;
  isLoading: boolean;
  error: unknown | null;
};

const initialState: EventsState = {
  events: [],
  selectedId: null,
  isLoading: false,
  error: null,
};

export const eventsStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withDevtools('Events'),
  withState(initialState),
  withComputed((state) => ({
    selectedEvent: computed(() =>
      state.events().find((e) => e.id === state.selectedId()),
    ),
    selectedEventCapacity: computed(() => {
      const event = state.events().find((e) => e.id === state.selectedId());
      return event ? event.units * event.unitCapacity : 0;
    }),
  })),
  withMethods((store, eventsService = inject(EventsService)) => ({
    getEvents: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          eventsService.getEvents().pipe(
            tapResponse({
              next: (events) => patchState(store, { events }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    getEvent: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap((id) => {
          const event = store.events().find((e) => e.id === id);
          if (event) {
            return of(patchState(store, { selectedId: id, isLoading: false }));
          } else {
            return eventsService.getEvent(id).pipe(
              tapResponse({
                next: (event) =>
                  patchState(store, (state) => ({
                    events: [...state.events, event],
                    selectedId: id,
                  })),
                error: (error) => patchState(store, { error }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            );
          }
        }),
      ),
    ),
    createEvent: rxMethod<Partial<IEvent>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap((event) =>
          eventsService.createEvent(event).pipe(
            tapResponse({
              next: (event) =>
                patchState(store, (state) => ({
                  events: [...state.events, event],
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    updateEvent: rxMethod<Partial<IEvent>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap((event) =>
          eventsService.updateEvent(event).pipe(
            tapResponse({
              next: (event) =>
                patchState(store, (state) => ({
                  events: state.events.map((e) =>
                    e.id === event.id ? event : e,
                  ),
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    deleteEvent: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap((id) =>
          eventsService.deleteEvent(id).pipe(
            tapResponse({
              next: () =>
                patchState(store, (state) => ({
                  events: state.events.filter((e) => e.id !== id),
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.getEvents();
    },
  }),
);
