import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IBooking, IEvent } from '@nexanode/domain-interfaces';
import { bookingsStore } from '@nexanode/frontend-bookings-ng-state';
import { authStore } from '@nexanode/frontend-iam-ng-state';

type BookingForm = {
  [field in keyof Omit<
    IBooking,
    'id' | 'createdAt' | 'updatedAt'
  >]: FormControl<IBooking[field] | null>;
};

@Component({
  selector: 'nexanode-bookings-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexanodeBookingsFormComponent {
  private readonly store = inject(bookingsStore);
  private readonly auth = inject(authStore);
  private readonly fb = inject(FormBuilder);
  readonly booking = this.store.selectedBooking;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly bookingForm = this.fb.group<BookingForm>({
    eventId: new FormControl(null, [Validators.required]),
    userId: new FormControl(null),
    status: new FormControl('pending'),
    reference: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    units: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(10),
    ]),
    phone: new FormControl(null),
    contactName: new FormControl(null),
    contactEmail: new FormControl(null),
    contactPhone: new FormControl(null),
    addressLine1: new FormControl(null),
    addressLine2: new FormControl(null),
    city: new FormControl(null),
    state: new FormControl(null),
    postalCode: new FormControl(null),
    country: new FormControl(null),
    notes: new FormControl(null),
  });
  event = input.required<IEvent>();
  eventUnits: number | undefined;

  constructor() {
    effect(() => {
      const event = this.event();
      const user = this.auth.user();
      if (event) {
        this.bookingForm.patchValue({
          eventId: event.id,
        });
        this.eventUnits = this.store.getBookingUnitsForEvent(event.id);
      }
      if (user) {
        this.bookingForm.patchValue({
          userId: user.id,
          name: user.userName,
          email: user.email,
        });
      }
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const booking: Partial<IBooking> = Object.assign(this.bookingForm.value);
      this.store.createBooking(booking);
    }
  }
}
