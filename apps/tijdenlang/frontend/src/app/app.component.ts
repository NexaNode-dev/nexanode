import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TijdenlangHeaderComponent } from '@nexanode/tijdenlangverhaald-frontend-header-feature';

@Component({
  standalone: true,
  imports: [RouterOutlet, TijdenlangHeaderComponent],
  selector: 'tijdenlang-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Tijdenlang Verhaald';
}
