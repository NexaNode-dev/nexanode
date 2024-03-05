import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'nexanode-landing',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
  ],
  templateUrl: './frontend-nexanode-landing-feature.component.html',
  styleUrl: './frontend-nexanode-landing-feature.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontendNexanodeLandingFeatureComponent {
  onCtaClick(): void {
    console.log('CTA button clicked');
  }
}
