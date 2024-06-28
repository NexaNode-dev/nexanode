import {
  ChangeDetectionStrategy,
  Component,
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { authStore } from '@nexanode/frontend-iam-ng-state';
import { bootstrapEye, bootstrapEyeSlash } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

type ResetForm = {
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
};

@Component({
  selector: 'nexanode-admin-feature-reset',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterLink,
    NgIconComponent,
  ],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ bootstrapEye, bootstrapEyeSlash })],
})
export class NexaNodeAdminAuthResetComponent {
  private readonly store = inject(authStore);
  private readonly fb = inject(FormBuilder);
  readonly isReset = this.store.isReset;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly resetForm = this.fb.group<ResetForm>(
    {
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    },
    {
      validators: (form) => {
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { passwordMismatch: true };
      },
    },
  );
  token = input.required<string>();
  showPassword = false;

  onSubmit() {
    if (this.resetForm.valid) {
      this.store.resetPassword({
        token: this.token(),
        password: this.resetForm.value.password || '',
      });
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  get password() {
    return this.resetForm.get('password');
  }

  get confirmPassword() {
    return this.resetForm.get('confirmPassword');
  }
}
