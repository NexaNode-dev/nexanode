import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'stoic-navbar',
    imports: [MatToolbarModule, MatButtonModule, MatMenuModule, RouterModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {}
