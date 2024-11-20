import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'eazywork-cta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EazyworkCtaComponent {}
