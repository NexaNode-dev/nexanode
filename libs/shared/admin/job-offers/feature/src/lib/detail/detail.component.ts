import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { jobOffersStore } from '@nexanode/frontend-job-offers-ng-state';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonPipe, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'nexanode-admin-job-offers-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    JsonPipe,
    CurrencyPipe,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexanodeAdminJobOffersDetailComponent {
  private readonly store = inject(jobOffersStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly jobOffer = this.store.selectedJobOffer;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  id = input.required<string>();

  constructor() {
    effect(() => this.store.getJobOffer(this.id()), {
      allowSignalWrites: true,
    });
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this job offer?')) {
      this.store.deleteJobOffer(this.id());
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
