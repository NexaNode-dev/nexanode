import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { servicesStore } from '@nexanode/frontend-services-ng-state';
import '@nexanode/frontend-services-layouts';
import { mediaStore } from '@nexanode/frontend-media-ng-state';

@Component({
  selector: 'nexanode-services-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NexaNodeServicesListComponent {
  private readonly store = inject(servicesStore);
  private readonly mediaStore = inject(mediaStore);
  readonly services = this.store.services;
  readonly categories = this.store.categories;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly media = this.mediaStore.media;
  readonly servicesByCategory = computed(() => {
    return this.categories().map((category) => ({
      category,
      services: this.services().filter(
        (service) => service.categoryId === category.id,
      ),
      media: this.media(),
    }));
  });
  title = input<string>('Services');

  constructor() {
    effect(() =>
      this.mediaStore.updateQuery({
        where: this.services().map((service) => ({
          id: service.featuredImage,
        })),
      }),
      { allowSignalWrites: true }
    );
  }
}
