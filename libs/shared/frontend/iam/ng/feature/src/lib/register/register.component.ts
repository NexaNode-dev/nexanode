import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { authStore } from '@nexanode/frontend-iam-ng-state';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IRegister } from '@nexanode/domain-interfaces';
import { NgClass } from '@angular/common';

type RegisterForm = {
  [field in keyof IRegister]: FormControl<IRegister[field] | null>;
};

@Component({
  selector: 'nexanode-iam-feature-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly store = inject(authStore);
  private readonly fb = inject(FormBuilder);
  readonly isRegistered = this.store.isRegistered;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  title = input<string>('Register');
  registerForm = this.fb.group<RegisterForm>(
    {
      name: new FormControl(null),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    },
    {
      validators: [
        (group) => {
          const password = group.get('password')?.value;
          const confirmPassword = group.get('confirmPassword')?.value;
          return password === confirmPassword
            ? null
            : { passwordMismatch: true };
        },
      ],
    },
  );

  onSubmit() {
    if (this.registerForm.valid) {
      this.store.register(Object.assign(this.registerForm.value));
    }
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get passwordMismatch() {
    return this.registerForm.hasError('passwordMismatch');
  }
}
