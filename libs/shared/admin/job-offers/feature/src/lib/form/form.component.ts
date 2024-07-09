import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { jobOffersStore } from '@nexanode/frontend-job-offers-ng-state';
import { ActivatedRoute, Router } from '@angular/router';
import { IJobOffer } from '@nexanode/domain-interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

type JobOfferForm = {
  [field in keyof Omit<
    IJobOffer,
    'id' | 'createdAt' | 'updatedAt'
  >]: FormControl<IJobOffer[field] | null>;
};

@Component({
  selector: 'nexanode-admin-job-offers-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexanodeAdminJobOffersFormComponent {
  private readonly store = inject(jobOffersStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly jobOffer = this.store.selectedJobOffer;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly jobOfferForm = this.fb.group<JobOfferForm>({
    companyId: new FormControl(null),
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    location: new FormControl(null, [Validators.required]),
    salaryLow: new FormControl(null, [Validators.required]),
    salaryHigh: new FormControl(null),
    employmentType: new FormControl(null, [Validators.required]),
    workTime: new FormControl(null, [Validators.required]),
    contractDuration: new FormControl(null),
    hoursPerWeek: new FormControl(null),
    benefits: new FormControl(null),
    jobLevel: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    requirements: new FormControl(null, [Validators.required]),
  });
  id = input<string>();
  mode: 'Create ' | 'Update ' = 'Create ';

  constructor() {
    effect(
      () => {
        if (this.id()) {
          this.mode = 'Update ';
          this.store.getJobOffer(this.id() || '');
        }
        this.jobOfferForm.patchValue(this.jobOffer() || {});
      },
      { allowSignalWrites: true },
    );
  }

  onSubmit() {
    if (this.jobOfferForm.valid) {
      const jobOffer: Partial<IJobOffer> = Object.assign(
        this.jobOfferForm.value,
      );
      if (this.id()) {
        this.store.updateJobOffer({ id: this.id() || '', jobOffer });
        this.router.navigate(['..', '..', this.id()], {
          relativeTo: this.route,
        });
      } else {
        this.store.createJobOffer(jobOffer);
        this.router.navigate(['..', jobOffer.id], { relativeTo: this.route });
      }
    }
  }

  onBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  get employmentType() {
    return this.jobOfferForm.get('employmentType');
  }

  get workTime() {
    return this.jobOfferForm.get('workTime');
  }
}
