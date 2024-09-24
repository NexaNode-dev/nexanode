import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'eazywork-benefits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.css',
  animations: [
    trigger('slideInAnimation', [
      state(
        'out',
        style({
          opacity: 0,
          transform: 'translateY(20%)',
        }),
      ),
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        }),
      ),
      transition('out => in', animate('600ms ease-out')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EazyworkBenefitsComponent implements OnInit {
  benefits = [
    {
      title: 'Voor Bedrijven',
      description: `
      Ontdek en huur snel en kosteneffectief gekwalificeerde professionals in.
      Ons platform zorgt ervoor dat je kandidaten ontmoet die worden beoordeeld
      op hun vaardigheden, niet op hun achtergrond.
    `,
    },
    {
      title: 'Voor Werkzoekenden',
      description: `
      Jouw Vaardigheden, Jouw Kansen. Toon je expertise en maak verbinding met
      toonaangevende bedrijven in diverse sectoren. Bij Eazywork richten we ons
      op jouw vaardigheden en ervaring, niet op je achtergrond, om je te helpen
      de juiste baan te vinden die past bij je carrière-ambities. Of je nu op
      zoek bent naar een remote functie of een nieuwe uitdaging, wij bieden een
      platform waar jouw capaciteiten centraal staan.
    `,
    },
    {
      title: 'Voor Freelancers',
      description: `
      Toon je vaardigheden en vind remote opdrachten die aansluiten bij jouw
      expertise. We geloven in een op verdiensten gebaseerd systeem waarin jouw
      kennis en ervaring de sleutel zijn tot het ontgrendelen van kansen.
    `,
    },
  ];

  inView: boolean[] = [false, false, false];

  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkInView();
  }

  ngOnInit() {
    this.checkInView();
  }

  checkInView() {
    const elements = this.el.nativeElement.querySelectorAll('.benefits div');
    elements.forEach((element: HTMLElement, index: number) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100 && rect.bottom >= 0) {
        this.inView[index] = true;
      }
    });
  }
}
