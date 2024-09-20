import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'eazywork-benefits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EazyworkBenefitsComponent {}
