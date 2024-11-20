import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'stoic-hero',
    imports: [CommonModule],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {}
