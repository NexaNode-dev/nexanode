import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NexaNodeAmdinUiListComponent } from '@nexanode/admin-ui-util';
import { eventsStore } from '@nexanode/frontend-events-ng-state';

@Component({
    selector: 'nexanode-admin-events-list',
    imports: [NexaNodeAmdinUiListComponent, MatProgressSpinnerModule, JsonPipe],
    templateUrl: './list.component.html',
    styleUrl: './list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NexanodeAdminEventsListComponent {
  private readonly store = inject(eventsStore);
  readonly events = this.store.events;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly columns = computed(() => Object.keys(this.events()[0] || {}));
  readonly type = 'event';

  onDelete(ids: string[]) {
    ids.forEach((id) => this.store.deleteEvent(id));
  }
}
