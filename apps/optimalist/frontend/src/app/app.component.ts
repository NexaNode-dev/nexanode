import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '@nexanode/optimalist-frontend-navbar-feature';
import { ServicesStore } from '@nexanode/optimalist-frontend-services-state';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  selector: 'optimalist-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Optimalist Consulting';
  store = inject(ServicesStore);
  router = inject(Router);

  constructor() {
    this.store.getServices();
  }
}
