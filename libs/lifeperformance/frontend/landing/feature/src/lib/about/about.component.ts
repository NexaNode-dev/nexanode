import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'lifeperformance-landing-about',
    imports: [CommonModule],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {}
