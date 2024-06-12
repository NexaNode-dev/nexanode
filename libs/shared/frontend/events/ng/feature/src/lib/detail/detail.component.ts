import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { eventsStore } from '@nexanode/frontend-events-ng-state';

@Component({
  selector: 'nexanode-events-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {
  private readonly store = inject(eventsStore);
  readonly event = this.store.selectedEvent;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  id = input.required<string>();

  constructor() {
    this.store.getEvent(this.id);
  }
}
