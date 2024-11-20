import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'tijdenlangverhaald-services',
    imports: [CommonModule],
    templateUrl: './services.component.html',
    styleUrl: './services.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TijdenlangverhaaldServicesComponent {
  pageTitle = 'Ons aanbod';
  titleService = inject(Title);
  metaService = inject(Meta);

  constructor() {
    this.titleService.setTitle(`${this.pageTitle} | Tijdenlang Verhaald`);
    this.metaService.updateTag({
      name: 'description',
      content: 'Ontdek de unieke belevingsroutes en creatieve workshops van Tijdenlang Verhaald in Bokrijk.'
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'Aanbod, Workshops, Belevingsroutes, Bokrijk, Tijdenlang Verhaald, Creativiteit, Geschiedenis'
    });
  }
}
