import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapLinkedin,
  bootstrapTwitterX,
} from '@ng-icons/bootstrap-icons';

@Component({
    selector: 'nexanode-landing',
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        NgIconComponent,
    ],
    viewProviders: [provideIcons({ bootstrapTwitterX, bootstrapLinkedin })],
    templateUrl: './frontend-nexanode-landing-feature.component.html',
    styleUrl: './frontend-nexanode-landing-feature.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrontendNexanodeLandingFeatureComponent {
  onCtaClick(): void {
    console.log('CTA button clicked');
  }
}
