import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { authStore } from '@nexanode/frontend-iam-ng-state';
import { bootstrapCheckCircle } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'nexanode-admin-feature-activate',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    RouterLink,
    JsonPipe,
    NgIconComponent,
  ],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ bootstrapCheckCircle })],
})
export class NexaNodeAdminAuthActivateComponent {
  private readonly store = inject(authStore);
  readonly isActivated = this.store.isActivated;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  id = input.required<string>();
  token = input.required<string>();

  constructor() {
    effect(() => this.store.activate({ id: this.id(), token: this.token() }), {
      allowSignalWrites: true,
    });
  }
}
