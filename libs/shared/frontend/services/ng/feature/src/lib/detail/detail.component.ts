import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { servicesStore } from '@nexanode/frontend-services-ng-state';

@Component({
    selector: 'nexanode-services-detail',
    imports: [CurrencyPipe],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NexaNodeServicesDetailComponent {
  private readonly store = inject(servicesStore);
  readonly service = this.store.selectedService;
  readonly categories = this.store.categories;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  id = input.required<string>();

  constructor() {
    this.store.getService(this.id);
  }
}
