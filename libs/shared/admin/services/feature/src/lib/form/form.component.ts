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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { IService } from '@nexanode/domain-interfaces';
import { servicesStore } from '@nexanode/frontend-services-ng-state';

type ServiceForm = {
  [field in keyof Omit<
    IService,
    'id' | 'createdAt' | 'updatedAt'
  >]: FormControl<IService[field] | null>;
};

@Component({
    selector: 'nexanode-admin-services-form',
    imports: [
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
    ],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NexanodeAdminServicesFormComponent {
  private readonly store = inject(servicesStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly service = this.store.selectedService;
  readonly categories = this.store.categories;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly serviceForm = this.fb.group<ServiceForm>({
    name: new FormControl(null, [Validators.required]),
    summary: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
    categoryId: new FormControl(null),
    price: new FormControl(null),
  });
  id = input<string>();
  mode: 'Create ' | 'Update ' = 'Create ';

  constructor() {
    effect(
      () => {
        if (this.id()) {
          this.store.getService(this.id() || '');
          this.mode = 'Update ';
        }
        this.serviceForm.patchValue(this.service() || {});
      },
      { allowSignalWrites: true },
    );
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      const service: Partial<IService> = Object.assign(this.serviceForm.value);
      if (this.id()) {
        this.store.updateService({ ...service, id: this.id() });
        this.router.navigate(['..', '..', this.id()], {
          relativeTo: this.route,
        });
      } else {
        this.store.createService(service);
        this.router.navigate(['..', service.id], { relativeTo: this.route });
      }
    }
  }

  onBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  compareCategory(a: string, b: string) {
    return a === b;
  }
}
