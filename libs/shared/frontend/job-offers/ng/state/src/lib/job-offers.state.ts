import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { IJobOffer, IQueryParams } from '@nexanode/domain-interfaces';
import { JobOffersService } from '@nexanode/frontend-job-offers-ng-data-access';
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

type JobOffersState = {
  jobOffers: IJobOffer[];
  selectedId: string | null;
  isLoading: boolean;
  error: unknown | null;
  query: IQueryParams<IJobOffer>;
};

const initialState: JobOffersState = {
  jobOffers: [],
  selectedId: null,
  isLoading: false,
  error: null,
  query: {},
};

export const jobOffersState = signalStore(
  withDevtools('JobOffers'),
  withState(initialState),
  withComputed((state) => ({
    selectedJobOffer: computed(() =>
      state.jobOffers().find((jobOffer) => jobOffer.id === state.selectedId()),
    ),
  })),
  withMethods((store, jobOffersService = inject(JobOffersService)) => ({
    getJobOffers: rxMethod<IQueryParams<IJobOffer>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) =>
          jobOffersService.getJobOffers(query).pipe(
            tapResponse({
              next: (jobOffers) => patchState(store, { jobOffers }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    getJobOffer: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap((id) => {
          const jobOffer = store.jobOffers().find((j) => j.id === id);
          if (jobOffer) {
            return of(patchState(store, { selectedId: id, isLoading: false }));
          } else {
            return jobOffersService.getJobOffer(id).pipe(
              tapResponse({
                next: (jobOffer) =>
                  patchState(store, (state) => ({
                    jobOffers: [...state.jobOffers, jobOffer],
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
    createJobOffer: rxMethod<Partial<IJobOffer>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((jobOffer) =>
          jobOffersService.createJobOffer(jobOffer).pipe(
            tapResponse({
              next: (jobOffer) =>
                patchState(store, (state) => ({
                  jobOffers: [...state.jobOffers, jobOffer],
                  selectedId: jobOffer.id,
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    updateJobOffer: rxMethod<{ id: string; jobOffer: Partial<IJobOffer> }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ id, jobOffer }) =>
          jobOffersService.updateJobOffer(id, jobOffer).pipe(
            tapResponse({
              next: (jobOffer) =>
                patchState(store, (state) => ({
                  jobOffers: state.jobOffers.map((j) =>
                    j.id === jobOffer.id ? jobOffer : j,
                  ),
                  selectedId: jobOffer.id,
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    deleteJobOffer: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) =>
          jobOffersService.deleteJobOffer(id).pipe(
            tapResponse({
              next: () =>
                patchState(store, (state) => ({
                  jobOffers: state.jobOffers.filter((j) => j.id !== id),
                  selectedId: null,
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
    onInit({ getJobOffers, query }) {
      getJobOffers(query());
    },
  }),
);
