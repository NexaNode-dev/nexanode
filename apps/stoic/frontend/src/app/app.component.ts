import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@nexanode/stoic-frontend-navbar-feature';

@Component({
    imports: [RouterModule, NavbarComponent],
    selector: 'stoic-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'De Hedendaagse Stoicijn';
}
