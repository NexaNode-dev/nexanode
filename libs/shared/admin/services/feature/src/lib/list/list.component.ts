import { JsonPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NexaNodeAmdinUiListComponent } from '@nexanode/admin-ui-util';
import { servicesStore } from '@nexanode/frontend-services-ng-state';

@Component({
  selector: 'nexanode-admin-services-list',
  standalone: true,
  imports: [NexaNodeAmdinUiListComponent, MatProgressSpinnerModule, JsonPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class NexanodeAdminServicesListComponent {
  private readonly store = inject(servicesStore);
  readonly services = this.store.services;
  readonly categories = this.store.categories;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly columns = computed(() => Object.keys(this.services()[0] || {}));
  readonly type = 'service';

  onDelete(ids: string[]): void {
    ids.forEach((id) => this.store.deleteService(id));
  }
}
