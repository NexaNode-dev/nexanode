import { JsonPipe } from '@angular/common';
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
  //ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '@nexanode/domain-interfaces';
import { usersStore } from '@nexanode/frontend-users-ng-state';

type UserForm = {
  [field in keyof Omit<
    IUser,
    'id' | 'loginExpires' | 'createdAt' | 'updatedAt'
  >]: FormControl<IUser[field] | null>;
} & { confirmPassword: FormControl<string | null> };

@Component({
  selector: 'nexanode-admin-users-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    JsonPipe,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexanodeAdminUsersFormComponent {
  private readonly store = inject(usersStore);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly user = this.store.selectedUser;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  readonly userForm = this.fb.group<UserForm>(
    {
      userName: new FormControl(null, [
        Validators.required,
        //this.checkUserName(),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        //this.checkEmail(),
      ]),
      password: new FormControl(null),
      confirmPassword: new FormControl(null),
      isActive: new FormControl(null),
    },
    {
      validators: [
        (group) => {
          const password = group.get('password')?.value;
          const confirmPassword = group.get('confirmPassword')?.value;
          return password === confirmPassword ? null : { notMatch: true };
        },
      ],
    },
  );
  id = input<string>();
  mode: 'Create ' | 'Update ' = 'Create ';

  constructor() {
    effect(
      () => {
        if (this.id()) {
          this.store.getUser(this.id() || '');
          this.mode = 'Update ';
        }
        this.userForm.patchValue(this.user() || {});
      },
      { allowSignalWrites: true },
    );
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: Partial<IUser> = Object.assign(this.userForm.value);
      if (this.id()) {
        this.store.updateUser({ id: this.id() || '', user });
        this.router.navigate(['..', '..', this.id()], {
          relativeTo: this.route,
        });
      } else {
        this.store.createUser(user);
        this.router.navigate(['..', this.id()], { relativeTo: this.route });
      }
    }
  }

  onBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onCreateUserName() {
    if (!this.userForm.get('userName')?.value) {
      this.userForm
        .get('userName')
        ?.patchValue(this.userForm.get('email')?.value?.split('@')[0] || '');
    }
  }

  // private checkUserName() {
  //   return (control: FormControl): ValidationErrors | null => {
  //     if (control.value) {
  //       return this.store.userNameExists(control.value)
  //         ? { userName: true }
  //         : null;
  //     }
  //     return null;
  //   };
  // }

  // private checkEmail() {
  //   return (control: FormControl): ValidationErrors | null => {
  //     if (control.value) {
  //       console.log('checkEmail', this.store.emailExists(control.value));
  //       return this.store.emailExists(control.value) ? { email: true } : null;
  //     }
  //     return null;
  //   };
  // }
}
