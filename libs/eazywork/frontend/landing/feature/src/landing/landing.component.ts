import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EazyworkBannerComponent } from './banner/banner.component';

@Component({
  selector: 'eazywork-landing',
  standalone: true,
  imports: [EazyworkBannerComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EazyWorkLandingComponent {}
