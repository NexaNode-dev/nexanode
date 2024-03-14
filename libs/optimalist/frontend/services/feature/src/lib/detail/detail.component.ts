import { Component, OnInit, inject, input } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ServicesStore } from '@nexanode/optimalist-frontend-services-state';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'optimalist-services-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  private store = inject(ServicesStore);
  id = input.required<string>();
  service = this.store.selectedService;
  otherServices = this.store.otherServices;

  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.store.getServiceById(this.id());
  }
}
