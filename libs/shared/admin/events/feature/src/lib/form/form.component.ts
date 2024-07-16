import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nexanode-admin-events-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexanodeAdminEventsFormComponent {}
