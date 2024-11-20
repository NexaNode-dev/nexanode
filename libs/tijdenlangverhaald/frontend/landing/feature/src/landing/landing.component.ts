import { trigger, transition, style, animate, stagger, keyframes, query } from '@angular/animations';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'tijdenlangverhaald-landing',
    imports: [RouterLink],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.css',
    animations: [
        // Fade-in animatie voor het hoofdgedeelte
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('1s ease-in', style({ opacity: 1 })),
            ]),
        ]),
        // Slide-in animatie voor de titel
        trigger('slideInFromLeft', [
            transition(':enter', [
                style({ transform: 'translateX(-100%)', opacity: 0 }),
                animate('1s ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
            ]),
        ]),
        // Staggered animatie voor de lijstitems
        trigger('listStagger', [
            transition(':enter', [
                query('li', [
                    style({ opacity: 0, transform: 'translateY(20px)' }),
                    stagger('100ms', [
                        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
                    ]),
                ]),
            ]),
        ]),
        // Bounce animatie voor de CTA-knoppen
        trigger('buttonBounce', [
            transition(':enter', [
                animate('0.5s', keyframes([
                    style({ transform: 'scale(0.5)', offset: 0 }),
                    style({ transform: 'scale(1.05)', offset: 0.7 }),
                    style({ transform: 'scale(1)', offset: 1 }),
                ])),
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TijdenlangverhaaldLandingComponent {
  pageTitle = 'Home';
  titleService = inject(Title);
  metaService = inject(Meta);

  constructor() {
    this.titleService.setTitle(`${this.pageTitle} | Tijdenlang Verhaald`);
    this.metaService.updateTag({
      name: 'description',
      content: 'Ontdek de unieke belevingsroutes en creatieve workshops van Tijdenlang Verhaald in Bokrijk.'
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'Aanbod, Workshops, Belevingsroutes, Bokrijk, Tijdenlang Verhaald, Creativiteit, Geschiedenis'
    });
  }
}
