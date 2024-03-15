import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicesStore } from '@nexanode/optimalist-frontend-services-state';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'optimalist-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Optimalist Consulting';
  store = inject(ServicesStore);

  constructor() {
    this.store.getServices();
  }
}
