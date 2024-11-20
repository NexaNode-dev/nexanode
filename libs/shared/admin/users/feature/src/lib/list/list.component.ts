import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NexaNodeAmdinUiListComponent } from '@nexanode/admin-ui-util';
import { usersStore } from '@nexanode/frontend-users-ng-state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'nexanode-admin-users-list',
    imports: [NexaNodeAmdinUiListComponent, MatProgressSpinnerModule, JsonPipe],
    templateUrl: './list.component.html',
    styleUrl: './list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NexanodeAdminUsersListComponent {
  private readonly store = inject(usersStore);
  readonly users = this.store.users;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly columns = computed(() => Object.keys(this.users()[0]));

  onDelete(ids: string[]) {
    ids.forEach((id) => this.store.deleteUser(id));
  }
}
