import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lifeperformance-landing-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {}
