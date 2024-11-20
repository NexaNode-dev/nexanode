import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { TijdenlangFooterComponent } from '@nexanode/tijdenlangverhaald-frontend-footer-feature';
import { TijdenlangHeaderComponent } from '@nexanode/tijdenlangverhaald-frontend-header-feature';

@Component({
    imports: [RouterOutlet, TijdenlangHeaderComponent, TijdenlangFooterComponent],
    selector: 'tijdenlang-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tijdenlang Verhaald';
  titleService = inject(Title);

  constructor() {
    this.titleService.setTitle(this.title);
  }
}
