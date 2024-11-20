import {
  ChangeDetectionStrategy,
  Component,
  effect,
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
import { ILogin } from '@nexanode/domain-interfaces';
import { Router } from '@angular/router';

type LoginForm = {
  [field in keyof ILogin]: FormControl<ILogin[field] | null>;
};

@Component({
    selector: 'nexanode-iam-feature-login',
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly store = inject(authStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly isLoggedIn = this.store.isLoggedIn;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  title = input<string>('Login');
  loginForm = this.fb.group<LoginForm>({
    credential: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor() {
    effect(() => {
      if (this.isLoggedIn()) {
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.login(Object.assign(this.loginForm.value));
    }
  }

  get credential() {
    return this.loginForm.get('credential');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
