import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authStore } from '@nexanode/frontend-iam-ng-state';

@Component({
  selector: 'nexanode-iam-feature-activate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivateComponent {
  private readonly store = inject(authStore);
  readonly isActivated = this.store.isActivated;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;
  title = input<string>('Activate');
  id = input.required<string>();
  token = input.required<string>();

  constructor() {
    this.store.activate({id:this.id(), token: this.token()});
  }
}
