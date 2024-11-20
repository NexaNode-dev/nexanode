import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { authStore } from '@nexanode/frontend-iam-ng-state';

type ForgotForm = {
  credential: FormControl<string | null>;
};

@Component({
    selector: 'nexanode-admin-feature-forgot',
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './forgot.component.html',
    styleUrl: './forgot.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NexaNodeAdminAuthForgotComponent {
  private readonly store = inject(authStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly isForgot = this.store.isForgot;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly forgotForm = this.fb.group<ForgotForm>({
    credential: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.forgotForm.valid) {
      this.store.forgotPassword(this.forgotForm.value.credential || '');
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2500);
    }
  }

  get credential() {
    return this.forgotForm.get('credential');
  }
}
