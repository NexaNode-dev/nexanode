import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'stoic-virtues',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtues.component.html',
  styleUrl: './virtues.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtuesComponent {
  virtues = [
    {
      name: 'Wijsheid (Sapientia)',
      description:
        '<span class="text-xl">Wijsheid</span> is de deugd van kennis en het vermogen om verstandige keuzes te maken. Het omvat praktische wijsheid, zoals het vermogen om het verschil te zien tussen wat binnen onze controle ligt en wat niet, en theoretische wijsheid, zoals de zoektocht naar kennis over de wereld. Wijsheid stelt ons in staat om complexe situaties en menselijke relaties met inzicht en begrip te benaderen, waardoor we kunnen leven in harmonie met onszelf en de wereld om ons heen.',
      icon: 'assets/wijsheid.webp',
    },
    {
      name: 'Moed (Fortitudo)',
      description:
        '<span class="text-xl">Moed</span> is niet alleen de kracht om fysieke uitdagingen het hoofd te bieden, maar ook de vastberadenheid om moreel juist te handelen, zelfs in het aangezicht van persoonlijke tegenspoed, kritiek of onpopulaire opinies. Het omvat de moed om te verdedigen wat juist is, de zelfdiscipline om verleidingen te weerstaan, en de veerkracht om door te gaan in moeilijke tijden. Moed stelt ons in staat om onze principes te handhaven en te groeien door de uitdagingen van het leven.',
      icon: 'assets/moed.webp',
    },
    {
      name: 'Rechtvaardigheid (Iustitia)',
      description:
        '<span class="text-xl">Rechtvaardigheid</span> gaat over het behandelen van anderen met eerlijkheid, medeleven en respect. Het is de deugd die sociale harmonie bevordert door ervoor te zorgen dat iedereen krijgt wat hem of haar toekomt, inclusief het geven van hulp aan degenen die dat nodig hebben en het erkennen van de verdiensten van anderen. Rechtvaardigheid omvat eerlijkheid in onze transacties en de verantwoordelijkheid om bij te dragen aan het welzijn van onze gemeenschap en de mensen om ons heen.',
      icon: 'assets/rechtvaardigheid.webp',
    },
    {
      name: 'Matigheid (Temperantia)',
      description:
        '<span class="text-xl">Matigheid</span> is de deugd van zelfbeheersing en het vermogen om overdaad te vermijden. Het gaat om het vinden van een balans in alle aspecten van het leven, inclusief onze verlangens, emoties, en ons fysieke welzijn. Matigheid helpt ons om meester te worden over onze impulsen en te kiezen voor een eenvoudige, gefocuste levensstijl die vrij is van de onrust van overmatig verlangen en consumptie. Het stelt ons in staat om innerlijke rust en tevredenheid te vinden.',
      icon: 'assets/matigheid.webp',
    },
  ];
}
