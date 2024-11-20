import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EazyworkBannerComponent } from './banner/banner.component';
import { EazyWorkHeroComponent } from './hero/hero.component';
import { EazyworkBenefitsComponent } from './benefits/benefits.component';
import { EazyworkCtaComponent } from './cta/cta.component';

@Component({
  selector: 'eazywork-landing',
  standalone: true,
  imports: [
    EazyworkBannerComponent,
    EazyWorkHeroComponent,
    EazyworkBenefitsComponent,
    EazyworkCtaComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EazyWorkLandingComponent {}
