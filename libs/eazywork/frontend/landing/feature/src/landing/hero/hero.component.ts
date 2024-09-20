import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'eazywork-landing-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EazyWorkHeroComponent {}
