import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicesService } from '@nexanode/optimalist-frontend-services-data-access';

@Component({
  selector: 'optimalist-services-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  private servicesService = inject(ServicesService);
  services = signal<
    { id: string; title: string; summary: string; icon: string }[]
  >([{ id: '', title: '', summary: '', icon: '' }]);

  async ngOnInit() {
    this.services.set(await this.servicesService.getServices());
  }
}
