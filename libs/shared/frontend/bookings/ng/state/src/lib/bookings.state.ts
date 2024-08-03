import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { IBooking, IQueryParams } from '@nexanode/domain-interfaces';
import { BookingsService } from '@nexanode/frontend-bookings-ng-data-access';
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
import { concatMap, mergeMap, of, pipe, switchMap, tap } from 'rxjs';

type BookingsState = {
  bookings: IBooking[];
  selectedId: string | null;
  isLoading: boolean;
  error: unknown | null;
  query: IQueryParams<IBooking>;
};

const initialState: BookingsState = {
  bookings: [],
  selectedId: null,
  isLoading: false,
  error: null,
  query: {},
};

export const bookingsStore = signalStore(
  { providedIn: 'root' },
  withDevtools('Bookings'),
  withState(initialState),
  withComputed((state) => ({
    selectedBooking: computed(() =>
      state.bookings().find((b) => b.id === state.selectedId()),
    ),
  })),
  withMethods((store, bookingsService = inject(BookingsService)) => ({
    getBookings: rxMethod<IQueryParams<IBooking>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) =>
          bookingsService.getBookings(query).pipe(
            tapResponse({
              next: (bookings) => patchState(store, { bookings }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    getBooking: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap((id) => {
          const booking = store.bookings().find((b) => b.id === id);
          if (booking) {
            return of(
              patchState(store, { selectedId: booking.id, isLoading: false }),
            );
          } else {
            return bookingsService.getBooking(id).pipe(
              tapResponse({
                next: (booking) =>
                  patchState(store, (state) => ({
                    bookings: [...state.bookings, booking],
                    selectedId: booking.id,
                  })),
                error: (error) => patchState(store, { error }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            );
          }
        }),
      ),
    ),
    createBooking: rxMethod<Partial<IBooking>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((booking) =>
          bookingsService.createBooking(booking).pipe(
            tapResponse({
              next: (booking) =>
                patchState(store, (state) => ({
                  bookings: [...state.bookings, booking],
                  selectedId: booking.id,
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    updateBooking: rxMethod<{ id: string; booking: Partial<IBooking> }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ id, booking }) =>
          bookingsService.updateBooking(id, booking).pipe(
            tapResponse({
              next: (booking) =>
                patchState(store, (state) => ({
                  bookings: state.bookings.map((b) =>
                    b.id === booking.id ? booking : b,
                  ),
                  selectedId: booking.id,
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    deleteBooking: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        concatMap((id) =>
          bookingsService.deleteBooking(id).pipe(
            tapResponse({
              next: () =>
                patchState(store, (state) => ({
                  bookings: state.bookings.filter((b) => b.id !== id),
                  selectedId: null,
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    payBooking: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) =>
          bookingsService.payBooking(id).pipe(
            tapResponse({
              next: (paymentUrl) => (document.location.href = paymentUrl),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    cancelBooking: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) =>
          bookingsService.cancelBooking(id).pipe(
            tapResponse({
              next: (booking) =>
                patchState(store, (state) => ({
                  bookings: state.bookings.map((b) =>
                    b.id === booking.id ? booking : b,
                  ),
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    confirmBooking: rxMethod<{ id: string; paymentId: string }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ id, paymentId }) =>
          bookingsService.confirmBooking(id, paymentId).pipe(
            tapResponse({
              next: (booking) =>
                patchState(store, (state) => ({
                  bookings: state.bookings.map((b) =>
                    b.id === booking.id ? booking : b,
                  ),
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    updateQuery(query: IQueryParams<IBooking>) {
      patchState(store, { query });
    },
    getBookingUnitsForEvent(eventId: string) {
      return store.bookings().reduce((acc, booking) => {
        if (booking.eventId === eventId) {
          acc += booking.units;
        }
        return acc;
      }, 0);
    },
  })),
  withHooks({
    onInit({ getBookings, query }) {
      getBookings(query());
    },
  }),
);
