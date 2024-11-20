import { trigger, transition, style, animate } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'eazywork-landing-hero',
    imports: [],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.css',
    animations: [
        trigger('fadeInAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('2000ms ease-out', style({ opacity: 1 })),
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EazyWorkHeroComponent {}
