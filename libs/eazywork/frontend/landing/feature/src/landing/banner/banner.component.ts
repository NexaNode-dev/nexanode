import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'eazywork-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EazyworkBannerComponent {}
