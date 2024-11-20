import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NexanodeAdminNavigationComponent } from '@nexanode/admin-navigation-feature';
import { authStore } from '@nexanode/frontend-iam-ng-state';

@Component({
    imports: [RouterModule, NexanodeAdminNavigationComponent],
    selector: 'eazywork-admin-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Eazywork Admin';
  private readonly store = inject(authStore);

  constructor() {
    this.store.autoLogin();
  }
}
