import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { IRegister } from '@nexanode/domain-interfaces';
import { authStore } from '@nexanode/frontend-iam-ng-state';
import { bootstrapEye, bootstrapEyeSlash } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

type RegisterForm = {
  [field in keyof IRegister]: FormControl<IRegister[field] | null>;
};

@Component({
  selector: 'nexanode-admin-feature-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIconComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ bootstrapEye, bootstrapEyeSlash })],
})
export class NexaNodeAdminAuthRegisterComponent {
  private readonly store = inject(authStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly isRegistered = this.store.isRegistered;
  showPassword = false;
  readonly registerForm = this.fb.group<RegisterForm>(
    {
      userName: new FormControl(null),
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

  constructor() {
    effect(() => this.store.isLoggedIn() && this.router.navigate(['/']));
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.store.register(Object.assign(this.registerForm.value));
    }
  }

  onCreateUsername() {
    if (!this.registerForm.get('userName')?.value) {
      this.registerForm.patchValue({
        userName: this.registerForm.get('email')?.value?.split('@')[0],
      });
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  get userName() {
    return this.registerForm.get('userName');
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
}
