import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { eventsStore } from '@nexanode/frontend-events-ng-state';
import {
  bootstrapCalendarEvent,
  bootstrapMap,
  bootstrapCashStack,
  bootstrapPeople,
} from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
    selector: 'nexanode-events-detail',
    imports: [NgIconComponent, DatePipe, CurrencyPipe],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [
        provideIcons({
            bootstrapCalendarEvent,
            bootstrapMap,
            bootstrapCashStack,
            bootstrapPeople,
        }),
    ]
})
export class NexanodeEventsDetailComponent {
  private readonly store = inject(eventsStore);
  readonly event = this.store.selectedEvent;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly capacity = this.store.selectedEventCapacity;
  id = input.required<string>();

  constructor() {
    effect(() => this.store.getEvent(this.id()), { allowSignalWrites: true });
  }
}
