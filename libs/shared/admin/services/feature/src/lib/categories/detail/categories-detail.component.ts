import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { servicesStore } from '@nexanode/frontend-services-ng-state';

@Component({
  selector: 'nexanode-admin-services-categories-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    JsonPipe,
    CurrencyPipe,
  ],
  templateUrl: './categories-detail.component.html',
  styleUrl: './categories-detail.component.css',
})
export class NexanodeAdminServicesCategoriesDetailComponent {
  private readonly store = inject(servicesStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly category = this.store.selectedCategory;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  id = input.required<string>();

  constructor() {
    effect(() => this.store.getCategory(this.id()), {
      allowSignalWrites: true,
    });
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this category?')) {
      this.store.deleteCategory(this.id());
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
