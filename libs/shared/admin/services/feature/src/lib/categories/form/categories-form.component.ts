import { JsonPipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '@nexanode/domain-interfaces';
import { servicesStore } from '@nexanode/frontend-services-ng-state';

type CategoryForm = {
  [field in keyof Omit<
    ICategory,
    'id' | 'createdAt' | 'updatedAt'
  >]: FormControl<ICategory[field] | null>;
};

@Component({
    selector: 'nexanode-admin-services-categories-form',
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        JsonPipe,
    ],
    templateUrl: './categories-form.component.html',
    styleUrl: './categories-form.component.css'
})
export class NexanodeAdminServicesCategoriesFormComponent {
  private readonly store = inject(servicesStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly category = this.store.selectedCategory;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly categoryForm = this.fb.group<CategoryForm>({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null),
  });
  id = input<string>();
  mode: 'Create ' | 'Update ' = 'Create ';

  constructor() {
    effect(
      () => {
        if (this.id()) {
          this.store.getCategory(this.id() || '');
          this.mode = 'Update ';
        }
        this.categoryForm.patchValue(this.category() || {});
      },
      { allowSignalWrites: true },
    );
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const category: Partial<ICategory> = Object.assign(
        this.categoryForm.value,
      );
      if (this.id()) {
        this.store.updateCategory({ id: this.id(), ...category });
        this.router.navigate(['..', '..', this.id()], {
          relativeTo: this.route,
        });
      } else {
        this.store.createCategory(category);
        this.router.navigate(['..', this.category()?.id], {
          relativeTo: this.route,
        });
      }
    }
  }

  onBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
