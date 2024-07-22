import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { IMedia, IQueryParams } from '@nexanode/domain-interfaces';
import { MediaService } from '@nexanode/frontend-media-ng-data-access';
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

type MediaState = {
  media: IMedia[];
  selectedId: string | null;
  isLoading: boolean;
  error: unknown | null;
  query: IQueryParams<IMedia>;
};

const initialState: MediaState = {
  media: [],
  selectedId: null,
  isLoading: false,
  error: null,
  query: {},
};

export const mediaStore = signalStore(
  { providedIn: 'root' },
  withDevtools('Media'),
  withState(initialState),
  withComputed((state) => ({
    selectedMedia: computed(() =>
      state.media().find((media) => media.id === state.selectedId()),
    ),
  })),
  withMethods((store, mediaService = inject(MediaService)) => ({
    getMedia: rxMethod<IQueryParams<IMedia>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) =>
          mediaService.getMedia(query).pipe(
            tapResponse({
              next: (media) => patchState(store, { media }),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    getMediaItem: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap((id) => {
          const mediaItem = store.media().find((media) => media.id === id);
          if (mediaItem) {
            return of(patchState(store, { selectedId: id, isLoading: false }));
          } else {
            return mediaService.getMediaItem(id).pipe(
              tapResponse({
                next: (media) =>
                  patchState(store, (state) => ({
                    media: [...state.media, media],
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
    createMedia: rxMethod<Partial<IMedia>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((media) =>
          mediaService.createMedia(media).pipe(
            tapResponse({
              next: (media) =>
                patchState(store, (state) => ({
                  media: [...state.media, media],
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    updateMedia: rxMethod<{ id: string; media: Partial<IMedia> }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ id, media }) =>
          mediaService.updateMedia(id, media).pipe(
            tapResponse({
              next: (media) =>
                patchState(store, (state) => ({
                  media: state.media.map((m) => (m.id === id ? media : m)),
                })),
              error: (error) => patchState(store, { error }),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    deleteMedia: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) =>
          mediaService.deleteMedia(id).pipe(
            tapResponse({
              next: () =>
                patchState(store, (state) => ({
                  media: state.media.filter((m) => m.id !== id),
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
    onInit({ getMedia, query }) {
      getMedia(query);
    },
  }),
);
