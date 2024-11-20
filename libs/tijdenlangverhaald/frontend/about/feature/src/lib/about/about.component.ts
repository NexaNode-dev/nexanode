import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'tijdenlangverhaald-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TijdenlangverhaaldAboutComponent {
  pageTitle = 'Over ons';
  titleService = inject(Title);
  metaService = inject(Meta);

  constructor() {
    this.titleService.setTitle(`${this.pageTitle} | Tijdenlang Verhaald`);
    this.metaService.updateTag({
      name: 'description',
      content: 'Leer meer over Jolijn Beckers en haar passie voor geschiedenis en creativiteit bij Tijdenlang Verhaald.'
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'Tijdenlang Verhaald, Over Ons, Jolijn Beckers, Gids, Bokrijk, Geschiedenis, Creativiteit'
    });
  }
}
