import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { eventsStore } from '@nexanode/frontend-events-ng-state';

@Component({
  selector: 'nexanode-events-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  private readonly store = inject(eventsStore);
  readonly events = this.store.events;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
}
