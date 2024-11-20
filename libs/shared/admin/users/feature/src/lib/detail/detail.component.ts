import { DatePipe, JsonPipe } from '@angular/common';
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
import { usersStore } from '@nexanode/frontend-users-ng-state';

@Component({
    selector: 'nexanode-admin-users-detail',
    imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        JsonPipe,
        DatePipe,
    ],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NexanodeAdminUsersDetailComponent {
  private readonly store = inject(usersStore);
  readonly user = this.store.selectedUser;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  id = input.required<string>();

  constructor() {
    effect(
      () => {
        this.store.getUser(this.id());
      },
      { allowSignalWrites: true },
    );
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this user?')) {
      this.store.deleteUser(this.id());
      this.router.navigate(['..'], { relativeTo: this.route });
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
