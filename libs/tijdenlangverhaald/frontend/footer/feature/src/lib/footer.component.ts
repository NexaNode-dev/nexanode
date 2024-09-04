import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  bootstrapEnvelopeAtFill,
  bootstrapInstagram,
  bootstrapLinkedin,
} from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'tijdenlangverhaald-footer',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ bootstrapInstagram, bootstrapLinkedin, bootstrapEnvelopeAtFill })],
})
export class TijdenlangFooterComponent {}
