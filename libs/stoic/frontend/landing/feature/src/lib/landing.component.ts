import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IntroComponent } from './intro/intro.component';
import { VirtuesComponent } from './virtues/virtues.component';
import { BeliefsComponent } from './beliefs/beliefs.component';
import { HeroComponent } from './hero/hero.component';

@Component({
  selector: 'stoic-landing',
  standalone: true,
  imports: [IntroComponent, VirtuesComponent, BeliefsComponent, HeroComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {}
