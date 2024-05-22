import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  bootstrapInstagram,
  bootstrapLinkedin,
} from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'lifeperformance-footer',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ bootstrapLinkedin, bootstrapInstagram })],
})
export class FooterComponent {}
