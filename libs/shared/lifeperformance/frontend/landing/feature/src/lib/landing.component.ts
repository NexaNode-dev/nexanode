import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IntroComponent } from './intro/intro.component';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'lifeperformance-landing',
  standalone: true,
  imports: [IntroComponent, AboutComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {}