import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lifeperformance-header',
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  navOpen = false;

  toggleNav() {
    this.navOpen = !this.navOpen;
  }
}
