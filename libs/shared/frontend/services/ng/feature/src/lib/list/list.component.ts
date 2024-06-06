import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { servicesStore } from '@nexanode/frontend-services-ng-state';

@Component({
  selector: 'nexanode-services-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaNodeServicesListComponent {
  private readonly store = inject(servicesStore);
  readonly services = this.store.services;
  readonly categories = this.store.categories;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly servicesByCategory = computed(() => {
    return this.categories().map((category) => ({
      category,
      services: this.services().filter(
        (service) => service.categoryId === category.id,
      ),
    }));
  });
  title = input<string>('Services');
}
