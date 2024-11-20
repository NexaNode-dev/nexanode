import { JsonPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NexaNodeAmdinUiListComponent } from '@nexanode/admin-ui-util';
import { servicesStore } from '@nexanode/frontend-services-ng-state';

@Component({
    selector: 'nexanode-admin-services-categories-list',
    imports: [NexaNodeAmdinUiListComponent, MatProgressSpinnerModule, JsonPipe],
    templateUrl: './categories-list.component.html',
    styleUrl: './categories-list.component.css'
})
export class NexanodeAdminServicesCategoriesListComponent {
  private readonly store = inject(servicesStore);
  readonly categories = this.store.categories;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly columns = computed(() => Object.keys(this.categories()[0] || {}));
  readonly type = 'category';

  onDelete(ids: string[]): void {
    ids.forEach((id) => this.store.deleteCategory(id));
  }
}
