import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from '@nexanode/domain-interfaces';
import { eventsStore } from '@nexanode/frontend-events-ng-state';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

type EventForm = {
  [field in keyof Omit<IEvent, 'id' | 'createdAt' | 'updatedAt'>]: FormControl<
    IEvent[field] | null
  >;
};

@Component({
  selector: 'nexanode-admin-events-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexanodeAdminEventsFormComponent {
  private readonly store = inject(eventsStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly event = this.store.selectedEvent;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly totalCapacity = this.store.selectedEventCapacity;
  readonly eventForm = this.fb.group<EventForm>({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    location: new FormControl(null, [Validators.required]),
    from: new FormControl(null, [Validators.required]),
    to: new FormControl(null),
    price: new FormControl(null),
    units: new FormControl(null, [Validators.required]),
    unitType: new FormControl(null, [Validators.required]),
    unitCapacity: new FormControl(null, [Validators.required]),
    recurring: new FormControl(null, [Validators.required]),
    interval: new FormControl(null),
    intervalUnit: new FormControl(null),
  });
  id = input<string>();
  mode: 'Create ' | 'Update ' = 'Create ';
  readonly now = Date.now();

  constructor() {
    effect(
      () => {
        if (this.id()) {
          this.store.getEvent(this.id() || '');
          this.mode = 'Update ';
        }
        this.eventForm.patchValue(this.event() || {});
      },
      { allowSignalWrites: true },
    );
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const event: Partial<IEvent> = Object.assign(this.eventForm.value);
      if (this.id()) {
        this.store.updateEvent({ id: this.id(), ...event });
        this.router.navigate(['..', '..', this.id()], {
          relativeTo: this.route,
        });
      } else {
        this.store.createEvent(event);
        this.router.navigate(['..', event.id], { relativeTo: this.route });
      }
    }
  }

  onBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  get recurring() {
    return this.eventForm.get('recurring');
  }
}
