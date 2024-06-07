import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lifeperformance-landing-intro',
  standalone: true,
  imports: [],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {}
