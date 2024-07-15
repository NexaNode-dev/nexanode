import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NexanodeAdminNavigationComponent } from '@nexanode/admin-navigation-feature';

@Component({
  standalone: true,
  imports: [RouterModule, NexanodeAdminNavigationComponent],
  selector: 'eazywork-admin-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Eazywork Admin';
}
