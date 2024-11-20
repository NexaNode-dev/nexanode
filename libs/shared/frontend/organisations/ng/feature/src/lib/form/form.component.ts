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
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { IOrganisation } from '@nexanode/domain-interfaces';
import { organisationsStore } from '@nexanode/frontend-organisations-ng-state';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

type OrganisationForm = {
  [field in keyof Omit<
    IOrganisation,
    'id' | 'createdAt' | 'updatedAt'
  >]: FormControl<IOrganisation[field] | null>;
};

@Component({
    selector: 'nexanode-form',
    imports: [ReactiveFormsModule, JsonPipe],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
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
  readonly registrationOK = this.store.registrationOK;
  readonly organisationForm = this.fb.group<OrganisationForm>({
    name: new FormControl(null, [Validators.required]),
    typeId: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
    registrationNumber: new FormControl(null, [
      Validators.required,
      this.validateRegistrationCode(),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
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

  onCheckRegistrationCode() {
    if (this.organisationForm.get('registrationNumber')?.value) {
      this.store.checkRegistrationCode(
        this.organisationForm.get('registrationNumber')?.value || '',
      );
    }
  }

  private validateRegistrationCode() {
    return (control: FormControl): ValidationErrors | null => {
      if (control.value) {
        this.store.checkRegistrationCode(control.value);
        return this.registrationOK() ? null : { registrationCode: true };
      }
      return null;
    };
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

  get email() {
    return this.organisationForm.get('email');
  }

  get phone() {
    return this.organisationForm.get('phone');
  }
}
