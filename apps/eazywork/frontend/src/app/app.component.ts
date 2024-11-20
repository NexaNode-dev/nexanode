import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EazyworkHeaderComponent } from '@nexanode/eazywork-frontend-header-feature';

@Component({
    imports: [RouterModule, EazyworkHeaderComponent],
    selector: 'eazywork-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EazyWork';
}
