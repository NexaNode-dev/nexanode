import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'stoic-beliefs',
    imports: [CommonModule],
    templateUrl: './beliefs.component.html',
    styleUrl: './beliefs.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeliefsComponent {
  coreBeliefs = [
    {
      title: 'Leven Volgens de Natuur',
      description:
        '"Leven volgens de natuur" is een fundamenteel Stoïcijns principe dat ons oproept om in harmonie te leven met de universele rede die de natuur ordent. Dit betekent dat we onze acties moeten baseren op redelijkheid, moeten streven naar zelfverbetering en ons moeten inzetten voor het welzijn van de gemeenschap. Door onze rollen binnen de familie en samenleving met integriteit en toewijding te vervullen, en door actief deel te nemen aan het openbare leven, leven we in overeenstemming met onze ware aard als rationele en sociale wezens. Dit principe moedigt ons aan om onze verplichtingen te erkennen en na te streven, en om een leven te leiden dat is afgestemd op zowel onze persoonlijke als universele natuur.',
    },
    {
      title: 'Geluk Vind je in Deugdzaamheid',
      description:
        'De Stoïcijnen geloofden dat echt geluk alleen kan worden bereikt door deugdzaamheid, oftewel het nastreven van menselijke excellentie. Dit proces omvat het beheersen van onze verlangens, afkeren en impulsen, zodat deze in overeenstemming zijn met de vier kardinale deugden: matigheid, moed, rechtvaardigheid en praktische wijsheid. Deugdzaamheid vormt de basis van een goed leven en zorgt ervoor dat we ons gedragen op een manier die eerlijk, dapper, gematigd en wijs is. Door onze focus te leggen op deze deugden, kunnen we een leven leiden dat niet alleen goed is voor onszelf, maar ook voordelig is voor anderen om ons heen.',
    },
    {
      title: 'We Beheersen Alleen Onze Eigen Gedachten en Acties',
      description:
        'Een ander belangrijk Stoïcijns inzicht is dat we alleen controle hebben over onze eigen gedachten, meningen, beslissingen en acties. Externe gebeurtenissen vallen buiten onze macht, maar hoe we reageren op deze gebeurtenissen, ligt volledig binnen ons bereik. Door deze kennis te omarmen, kunnen we een standvastigheid ontwikkelen die ons helpt omgaan met de uitdagingen van het leven. Het onderscheid maken tussen wat wel en niet binnen onze controle ligt, stelt ons in staat om onze energie te richten op het verbeteren van onszelf en het vervullen van onze plichten, in plaats van ons zorgen te maken over onveranderlijke externe omstandigheden.',
    },
    {
      title: 'Alle Innerlijke Hulpbronnen Die We Nodig Hebben',
      description:
        'Een ander belangrijk Stoïcijns inzicht is dat we alleen controle hebben over onze eigen gedachten, meningen, beslissingen en acties. Externe gebeurtenissen vallen buiten onze macht, maar hoe we reageren op deze gebeurtenissen, ligt volledig binnen ons bereik. Door deze kennis te omarmen, kunnen we een standvastigheid ontwikkelen die ons helpt omgaan met de uitdagingen van het leven. Het onderscheid maken tussen wat wel en niet binnen onze controle ligt, stelt ons in staat om onze energie te richten op het verbeteren van onszelf en het vervullen van onze plichten, in plaats van ons zorgen te maken over onveranderlijke externe omstandigheden.',
    },
    {
      title: 'We Moeten Toxische Emoties Elimineren',
      description:
        'Stoïcisme leert ons dat hoop, angst, en woede contraproductieve strategieën zijn die voortkomen uit verkeerde overtuigingen en waarden. Door ons te richten op rationele keuzes en deugdzaam gedrag, kunnen we deze toxische emoties overwinnen en een meer stabiel en tevreden leven leiden.',
    },
    {
      title: 'We Zijn en Moeten Een Verenigd Zelf Blijven',
      description:
        'De Stoïcijnen benadrukken het belang van zelfconsistentie en integriteit, waarbij we verantwoordelijkheid nemen voor onze eigen acties en overtuigingen. Door trouw te blijven aan onze principes en waarden, kunnen we een harmonieus en authentiek leven leiden.',
    },
    {
      title: 'Niemand is een Eiland: De Stoïcijnse Gouden Regel',
      description:
        'Het Stoïcisme herinnert ons eraan dat we sociale wezens zijn, intrinsiek verbonden met anderen. Door het bevorderen van empathie, rechtvaardigheid, en samenwerking, kunnen we de welzijn van onze gemeenschap vergroten en tegelijkertijd onze eigen ontwikkeling bevorderen.',
    },
    {
      title:
        'Onze Persoonlijke Ontwikkeling is Verbonden met Samenwerking met Anderen',
      description:
        'Echte persoonlijke groei en ontwikkeling komen voort uit onze interacties en samenwerking met anderen. Door anderen te helpen en bij te dragen aan het gemeenschappelijk goed, verrijken we ons eigen leven en dat van de gemeenschap.',
    },
    {
      title:
        'Volhard en Weersta: Het Draait Allemaal om Vooruitgang, Niet om Perfectie',
      description:
        'De Stoïcijnse levenskunst is een proces van continue zelfverbetering en leren. Door te streven naar deugdzaamheid en het cultiveren van goede gewoonten, kunnen we vooruitgang boeken op ons pad naar wijsheid en geluk, ongeacht de externe omstandigheden.',
    },
  ];
}
