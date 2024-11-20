import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@nexanode/lifeperformance-frontend-footer-feature';
import { HeaderComponent } from '@nexanode/lifeperformance-frontend-header-feature';

@Component({
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    selector: 'liferperformance-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'life. performance';
}
