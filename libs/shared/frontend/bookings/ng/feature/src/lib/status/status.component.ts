import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { bookingsStore } from '@nexanode/frontend-bookings-ng-state';

@Component({
  selector: 'nexanode-bookings-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexanodeBookingsStatusComponent {
  private readonly store = inject(bookingsStore);
  readonly booking = this.store.selectedBooking;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  id = input.required<string>();

  constructor() {
    effect(
      () => {
        if (this.id()) {
          this.store.getBooking(this.id());
        }
        if (this.booking()?.status === 'pending') {
          this.store.payBooking(this.booking()?.id || '');
        }
      },
      { allowSignalWrites: true },
    );
  }
}
