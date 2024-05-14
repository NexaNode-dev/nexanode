import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lifeperformance-landing-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  masterclasses = [
    {
      title: 'Mind & Body Masterclass',
      description:
        'Ontdek de kracht van de geest en het lichaam met onze Mind & Body Masterclass. Leer hoe je intermitterende prikkels zoals ademhaling en koude kunt gebruiken om je energie te optimaliseren, stress te verminderen en je algehele welzijn te verbeteren. Deze masterclass biedt praktische technieken en inzichten die je kunt integreren in je dagelijks leven voor langdurige positieve verandering, zowel persoonlijk als professioneel.      ',
      image: 'assets/masterclass1.jpg',
    },
    {
      title: 'Performance Masterclass',
      description:
        'Wil je jouw persoonlijke en professionele prestaties naar een hoger niveau tillen? Onze Performance Masterclass is precies wat je nodig hebt. Leer hoe je intermitterende prikkels zoals ademhaling, koude en voeding kunt gebruiken om je focus, productiviteit en veerkracht te vergroten. Tijdens deze masterclass wordt er ook gekookt voor de deelnemers, zodat je een lunch krijgt die aansluit bij wat je leert, wat zorgt voor een complete ervaring. Ontdek hoe deze technieken en strategieën kunnen worden toegepast in de professionele wereld voor maximale impact.',
      image: 'assets/masterclass2.jpg',
    },
    {
      title: 'Team Dynamics Masterclass',
      description:
        'Sterke teams zijn de ruggengraat van succesvolle organisaties. In onze Team Dynamics Masterclass leer je hoe je een cultuur van samenwerking en synergie kunt creëren binnen je team door gebruik te maken van intermitterende prikkels zoals ademhaling, koude, warmte en voeding. Ontdek hoe je effectief kunt communiceren, conflicten kunt oplossen en elkaar kunt ondersteunen om gezamenlijke doelen te bereiken. Tijdens deze masterclass wordt er ook gekookt voor de deelnemers, zodat je een lunch krijgt die aansluit bij wat je leert, wat zorgt voor een complete ervaring. Deze masterclass biedt hands-on oefeningen en teambuildingactiviteiten om de banden te versterken en de prestaties van je team te verbeteren, zowel op de werkvloer als daarbuiten.',
      image: 'assets/masterclass3.jpg',
    },
  ];

  teambuildings = [
    {
      title: 'Adventure Boost (Halve dag Team Building)',
      description:
        'Duik in een halve dag vol avontuurlijke uitdagingen en verrijkende activiteiten om de samenwerking en teamgeest te versterken. Deze sessie omvat een ademhalingssessie voor focus en verbinding, spannende sportieve teamuitdagingen en een gezonde lunch. Maak je klaar om te groeien als team terwijl je jezelf uitdaagt en nieuwe hoogten bereikt.',
      image: 'assets/teambuilding1.jpg',
    },
    {
      title: 'Ultieme Teamuitdaging (Hele dag Team Building)',
      description:
        'Neem deel aan een volledige dag vol avontuur en teamwork, met alles wat de Adventure Boost biedt, plus extra individuele uitdagingen. Naast de ademhalingssessie, sportieve teamuitdagingen en gezonde lunch, zullen individuele uitdagingen met intermitterende prikkels zoals koude en warmte je team tot het uiterste testen. Ontdek nieuwe grenzen, bouw vertrouwen op en versterk de banden die je team onverslaanbaar maken.',
      image: 'assets/teambuilding2.jpg',
    },
  ];
}
