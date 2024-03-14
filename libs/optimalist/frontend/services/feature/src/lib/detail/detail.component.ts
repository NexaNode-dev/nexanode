import {
  Component,
  OnInit,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ServicesService } from '@nexanode/optimalist-frontend-services-data-access';

@Component({
  selector: 'optimalist-services-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  private servicesService = inject(ServicesService);
  id = input.required<string>();
  service = signal<{
    id: string;
    title: string;
    description: string;
    coverImage: string;
  }>({ id: '', title: '', description: '', coverImage: '' });
  private serviceEffect = effect(async () => {
    this.service.set(await this.servicesService.getServiceById(this.id()));
  });

  constructor(private viweportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.viweportScroller.scrollToPosition([0, 0]);
  }
}
