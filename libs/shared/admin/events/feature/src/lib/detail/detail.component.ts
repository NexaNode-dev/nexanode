import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { eventsStore } from '@nexanode/frontend-events-ng-state';

@Component({
    selector: 'nexanode-admin-events-detail',
    imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        JsonPipe,
        CurrencyPipe,
        DatePipe,
    ],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NexanodeAdminEventsDetailComponent {
  private readonly store = inject(eventsStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly event = this.store.selectedEvent;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly totalCapacity = this.store.selectedEventCapacity;
  id = input.required<string>();

  constructor() {
    effect(() => this.store.getEvent(this.id()), {
      allowSignalWrites: true,
    });
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this event?')) {
      this.store.deleteEvent(this.id());
    }
  }

  onEdit() {
    this.router.navigate(['..', 'update', this.id()], {
      relativeTo: this.route,
    });
  }

  onBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
