import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicesStore } from '@nexanode/optimalist-frontend-services-state';

@Component({
  selector: 'optimalist-services-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  private store = inject(ServicesStore);
  services = this.store.services;
}
