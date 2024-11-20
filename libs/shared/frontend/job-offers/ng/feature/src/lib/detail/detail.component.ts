import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { jobOffersStore } from '@nexanode/frontend-job-offers-ng-state';
import { organisationsStore } from '@nexanode/frontend-organisations-ng-state';

@Component({
    selector: 'nexanode-feature-job-offers-detail',
    imports: [],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NexanodeJobOffersDetailComponent {
  private readonly store = inject(jobOffersStore);
  private readonly companyStore = inject(organisationsStore);
  private readonly router = inject(Router);
  readonly jobOffer = computed(() => {
    return {
      jobOffer: this.store.selectedJobOffer(),
      company: this.companyStore
        .organisations()
        .find((o) => o.id === this.store.selectedJobOffer()?.companyId),
    };
  });
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  id = input.required<string>();

  constructor() {
    effect(
      () => {
        this.store.getJobOffer(this.id());
      },
      { allowSignalWrites: true },
    );
    this.companyStore.getOrganisations();
  }

  onBack() {
    this.router.navigate(['..']);
  }

  onApply() {
    alert('Application form is not implemented yet');
  }
}
