import {
  ChangeDetectionStrategy,
  Component,
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
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  title = input<string>('Services');
}
