import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NexaNodeAmdinUiListComponent } from '@nexanode/admin-ui-util';
import { jobOffersStore } from '@nexanode/frontend-job-offers-ng-state';

@Component({
    selector: 'nexanode-admin-job-offers-list',
    imports: [NexaNodeAmdinUiListComponent, MatProgressSpinnerModule, JsonPipe],
    templateUrl: './list.component.html',
    styleUrl: './list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NexanodeAdminJobOffersListComponent {
  private readonly store = inject(jobOffersStore);
  readonly jobOffers = this.store.jobOffers;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly columns = computed(() => Object.keys(this.jobOffers()[0] || {}));
  readonly type = 'job offer';

  onDelete(ids: string[]): void {
    ids.forEach((id) => this.store.deleteJobOffer(id));
  }
}
