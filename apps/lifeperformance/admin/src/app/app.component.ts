import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NexanodeAdminNavigationComponent } from '@nexanode/admin-navigation-feature';
import { authStore } from '@nexanode/frontend-iam-ng-state';

@Component({
  standalone: true,
  imports: [RouterOutlet, NexanodeAdminNavigationComponent],
  selector: 'lifeperformance-admin-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Lifeperformance Admin';
  private readonly store = inject(authStore);
  private readonly router = inject(Router);

  constructor() {
    this.store.autoLogin();
  }
}
