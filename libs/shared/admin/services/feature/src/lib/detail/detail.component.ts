import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { servicesStore } from '@nexanode/frontend-services-ng-state';

@Component({
    selector: 'nexanode-admin-services-detail',
    imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        JsonPipe,
        CurrencyPipe,
    ],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.css'
})
export class NexanodeAdminServicesDetailComponent {
  private readonly store = inject(servicesStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly service = this.store.selectedService;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly serviceCategory = computed(() =>
    this.store
      .categories()
      .find((category) => category.id === this.service()?.categoryId),
  );
  id = input.required<string>();

  constructor() {
    effect(() => this.store.getService(this.id()), { allowSignalWrites: true });
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this service?')) {
      this.store.deleteService(this.id());
      this.onBack();
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
