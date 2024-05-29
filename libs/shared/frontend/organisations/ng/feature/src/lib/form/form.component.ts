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
import { IOrganisation } from '@nexanode/domain-interfaces';
import { organisationsStore } from '@nexanode/frontend-organisations-ng-state';
import { Router } from '@angular/router';

type OrganisationForm = {
  [field in keyof Omit<
    IOrganisation,
    'id' | 'createdAt' | 'updatedAt'
  >]: FormControl<IOrganisation[field] | null>;
};

@Component({
  selector: 'nexanode-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  private readonly store = inject(organisationsStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly selectedOrganisation = this.store.selectedOrganisation;
  readonly selectedOrganisationType = this.store.selectedOrganisationType;
  readonly organisationTypes = this.store.organisationTypes;
  readonly organisationForm = this.fb.group<OrganisationForm>({
    name: new FormControl(null, [Validators.required]),
    typeId: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
    registrationNumber: new FormControl(null, [Validators.required]),
  });
  id = input<string | undefined>(undefined);
  mode: 'Create ' | 'Update ' = 'Create ';

  constructor() {
    effect(
      () => {
        if (this.id()) {
          this.store.getOrganisation(this.id() || '');
          this.mode = 'Update ';
        }
        this.organisationForm.patchValue(this.selectedOrganisation() || {});
        if (this.store.selectedOrganisation() && this.mode === 'Create ') {
          this.organisationForm.reset();
          this.router.navigate(['/organisations']);
        }
      },
      { allowSignalWrites: true },
    );
    this.store.getOrganisationTypes();
  }

  onSubmit() {
    if (this.organisationForm.valid) {
      const organisation: IOrganisation = Object.assign(
        this.organisationForm.value,
      );
      this.id()
        ? this.store.updateOrganisation({ ...organisation, id: this.id() })
        : this.store.createOrganisation(organisation);
    }
  }

  get name() {
    return this.organisationForm.get('name');
  }

  get typeId() {
    return this.organisationForm.get('typeId');
  }

  get description() {
    return this.organisationForm.get('description');
  }

  get registrationNumber() {
    return this.organisationForm.get('registrationNumber');
  }
}
