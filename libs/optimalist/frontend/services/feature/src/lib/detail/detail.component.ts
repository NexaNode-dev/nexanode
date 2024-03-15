import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  inject,
  input,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ServicesStore } from '@nexanode/optimalist-frontend-services-state';
import { RouterModule } from '@angular/router';
import { MarkdownPipe } from '@nexanode/frontend-markdown-util-pipe';

@Component({
  selector: 'optimalist-services-detail',
  standalone: true,
  imports: [RouterModule, MarkdownPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit {
  private store = inject(ServicesStore);
  id = input.required<string>();
  service = this.store.selectedService;
  otherServices = this.store.otherServices;

  constructor(private viewportScroller: ViewportScroller) {
    effect(
      () => {
        this.store.getServiceById(this.id());
        this.viewportScroller.scrollToPosition([0, 0]);
      },
      {
        allowSignalWrites: true,
      },
    );
  }

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
