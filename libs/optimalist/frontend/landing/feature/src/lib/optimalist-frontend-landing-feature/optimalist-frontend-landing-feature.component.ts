import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent } from '@nexanode/optimalist-frontend-services-feature';

@Component({
    selector: 'optimalist-optimalist-frontend-landing-feature',
    imports: [ListComponent],
    templateUrl: './optimalist-frontend-landing-feature.component.html',
    styleUrl: './optimalist-frontend-landing-feature.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimalistFrontendLandingFeatureComponent {}
