import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { jobOffersStore } from '@nexanode/frontend-job-offers-ng-state';
import { organisationsStore } from '@nexanode/frontend-organisations-ng-state';
import {
  bootstrapBuilding,
  bootstrapCashStack,
  bootstrapClockHistory,
  bootstrapGeoAlt,
  bootstrapPersonBadgeFill,
  bootstrapTags,
} from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'nexanode-feature-job-offers-list',
  standalone: true,
  imports: [NgIconComponent, CurrencyPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      bootstrapBuilding,
      bootstrapGeoAlt,
      bootstrapCashStack,
      bootstrapPersonBadgeFill,
      bootstrapTags,
      bootstrapClockHistory,
    }),
  ],
})
export class NexanodeJobOffersListComponent {
  private readonly store = inject(jobOffersStore);
  private readonly companyStore = inject(organisationsStore);
  readonly jobOffers = computed(() =>
    this.store.jobOffers().map((jobOffer) => ({
      jobOffer,
      company: this.companyStore
        .organisations()
        .find((company) => company.id === jobOffer.companyId),
    })),
  );
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  constructor() {
    this.companyStore.getOrganisations();
  }
}
