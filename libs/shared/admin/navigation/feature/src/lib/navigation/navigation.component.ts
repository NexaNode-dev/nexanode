import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { authStore } from '@nexanode/frontend-iam-ng-state';

@Component({
  selector: 'nexanode-admin-navigation',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexanodeAdminNavigationComponent {
  private readonly store = inject(authStore);
  private readonly router = inject(Router);
  readonly user = this.store.user;
  readonly isLoggedIn = this.store.isLoggedIn;
  title = input.required<string>();
  navItems = signal<{ label: string; path: string; icon: string }[]>([]);

  constructor() {
    this.navItems.set(
      this.router.config
        .filter((route) => route.data !== undefined)
        .map((route) => route.data?.['nav']),
    );
  }

  onLogout() {
    this.store.logout();
  }
}
