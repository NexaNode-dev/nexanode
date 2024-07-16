import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { ILogin } from '@nexanode/domain-interfaces';
import { authStore } from '@nexanode/frontend-iam-ng-state';
import { bootstrapEye, bootstrapEyeSlash } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

type LoginForm = {
  [field in keyof ILogin]: FormControl<ILogin[field] | null>;
};

@Component({
  selector: 'nexanode-admin-feature-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ bootstrapEye, bootstrapEyeSlash })],
})
export class NexaNodeAdminAuthLoginComponent {
  private readonly store = inject(authStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly isLoggedIn = this.store.isLoggedIn;
  readonly loginForm = this.fb.group<LoginForm>({
    credential: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  showPassword = false;

  onSubmit() {
    if (this.loginForm.valid) {
      const login = Object.assign(this.loginForm.value);
      this.store.login(login);
      setTimeout(() => {
        if (this.isLoggedIn()) {
          this.router.navigate(['/']);
        }
      }, 3000);
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  get credential() {
    return this.loginForm.get('credential');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
