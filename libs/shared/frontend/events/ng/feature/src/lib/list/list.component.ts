import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { eventsStore } from '@nexanode/frontend-events-ng-state';
import {
  bootstrapCalendarEvent,
  bootstrapCashStack,
  bootstrapMap,
} from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'nexanode-events-list',
  standalone: true,
  imports: [RouterLink, DatePipe, CurrencyPipe, NgIconComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({ bootstrapCalendarEvent, bootstrapMap, bootstrapCashStack }),
  ],
})
export class NexanodeEventsListComponent {
  private readonly store = inject(eventsStore);
  readonly events = this.store.events;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  title = input<string>('Upcoming Events');
}
