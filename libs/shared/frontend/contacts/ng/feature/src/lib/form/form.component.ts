import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ContactsStore } from '@nexanode/frontend-contacts-ng-state';

@Component({
    selector: 'nexanode-contact-form',
    imports: [ReactiveFormsModule],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent {
  private readonly store = inject(ContactsStore);
  private readonly fb = inject(FormBuilder);
  selectedContact = this.store.selectedContact;
  isLoading = this.store.isLoading;
  error = this.store.error;
  contactForm: UntypedFormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    message: ['', Validators.required],
  });

  onSubmit() {
    if (this.contactForm.valid) {
      this.store.createContact(this.contactForm.value);
    }
  }
}
