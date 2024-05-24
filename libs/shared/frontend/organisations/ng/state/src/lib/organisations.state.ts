import { computed, inject } from '@angular/core';
import { IOrganisation, IOrganisationType } from '@nexanode/domain-interfaces';
import { OrganisationsService } from '@nexanode/frontend-organisations-ng-data-access';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, of, pipe, switchMap, tap } from 'rxjs';

type OrganisationsState = {
  organisations: IOrganisation[];
  organisationTypes: IOrganisationType[];
  selectedId: string | null;
  selectedTypeId: string | null;
  isLoading: boolean;
  error: unknown | null;
};

const initialState: OrganisationsState = {
  organisations: [],
  organisationTypes: [],
  selectedId: null,
  selectedTypeId: null,
  isLoading: false,
  error: null,
};

export const organisationsState = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    selectedOrganisation: computed(() =>
      state.organisations().find((o) => o.id === state.selectedId()),
    ),
    selectedOrganisationType: computed(() =>
      state.organisationTypes().find((ot) => ot.id === state.selectedTypeId()),
    ),
    selectedOrganisationTypeOrganisations: computed(() =>
      state.organisations().filter(
        (o) => o.typeId === state.selectedTypeId(),
      ),
    ),
  })),
  withMethods((store, organisationsService = inject(OrganisationsService)) => ({
    // Organisations
    getOrganisations: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          organisationsService.getOrganisations().pipe(
            tapResponse({
              next: (organisations) => patchState(store, { organisations }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    getOrganisation: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap((id) => {
          const organisation = store.organisations().find((o) => o.id === id);
          if (organisation) {
            return of(patchState(store, { selectedId: id, isLoading: false }));
          } else {
            return organisationsService.getOrganisation(id).pipe(
              tapResponse({
                next: (organisation) =>
                  patchState(store, (state) => ({
                    selectedId: id,
                    organisations: [...state.organisations, organisation],
                  })),
                error: (error) => patchState(store, { error }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            );
          }
        }),
      ),
    ),
    createOrganisation: rxMethod<IOrganisation>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((organisation) =>
          organisationsService.createOrganisation(organisation).pipe(
            tapResponse({
              next: (organisation) =>
                patchState(store, (state) => ({
                  organisations: [...state.organisations, organisation],
                  selectedId: organisation.id,
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    updateOrganisation: rxMethod<IOrganisation>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((organisation) =>
          organisationsService.updateOrganisation(organisation).pipe(
            tapResponse({
              next: (organisation) =>
                patchState(store, (state) => ({
                  organisations: state.organisations.map((o) =>
                    o.id === organisation.id ? organisation : o,
                  ),
                  selectedId: organisation.id,
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    deleteOrganisation: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) =>
          organisationsService.deleteOrganisation(id).pipe(
            tapResponse({
              next: () =>
                patchState(store, (state) => ({
                  organisations: state.organisations.filter((o) => o.id !== id),
                  selectedId: null,
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    // Organisation Types
    getOrganisationTypes: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          organisationsService.getOrganisationTypes().pipe(
            tapResponse({
              next: (organisationTypes) =>
                patchState(store, { organisationTypes }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    getOrganisationType: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap((id) => {
          const organisationType = store
            .organisationTypes()
            .find((ot) => ot.id === id);
          if (organisationType) {
            return of(
              patchState(store, { selectedTypeId: id, isLoading: false }),
            );
          } else {
            return organisationsService.getOrganisationType(id).pipe(
              tapResponse({
                next: (organisationType) =>
                  patchState(store, (state) => ({
                    selectedTypeId: id,
                    organisationTypes: [
                      ...state.organisationTypes,
                      organisationType,
                    ],
                  })),
                error: (error) => patchState(store, { error }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            );
          }
        }),
      ),
    ),
    createOrganisationType: rxMethod<IOrganisationType>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((organisationType) =>
          organisationsService.createOrganisationType(organisationType).pipe(
            tapResponse({
              next: (organisationType) =>
                patchState(store, (state) => ({
                  organisationTypes: [
                    ...state.organisationTypes,
                    organisationType,
                  ],
                  selectedTypeId: organisationType.id,
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    updateOrganisationType: rxMethod<IOrganisationType>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((organisationType) =>
          organisationsService.updateOrganisationType(organisationType).pipe(
            tapResponse({
              next: (organisationType) =>
                patchState(store, (state) => ({
                  organisationTypes: state.organisationTypes.map((ot) =>
                    ot.id === organisationType.id ? organisationType : ot,
                  ),
                  selectedTypeId: organisationType.id,
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    deleteOrganisationType: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) =>
          organisationsService.deleteOrganisationType(id).pipe(
            tapResponse({
              next: () =>
                patchState(store, (state) => ({
                  organisationTypes: state.organisationTypes.filter(
                    (ot) => ot.id !== id,
                  ),
                  selectedTypeId: null,
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
