import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { faker } from '@faker-js/faker';
import '@nexanode/frontend-about-layout';

@Component({
  selector: 'nexanode-stoic-frontend-about-feature',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './stoic-frontend-about-feature.component.html',
  styleUrl: './stoic-frontend-about-feature.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StoicFrontendAboutFeatureComponent {
  people = [
    {
      name: 'Olivier Vanistendael',
      image: 'assets/stoic-olivier.png',
      description: faker.lorem.paragraphs(20, '<br>\n'),
    },
    {
      name: 'Johan Vrolix',
      image: 'assets/stoic-johan.png',
      description: `
        <h2>Over Mij en Mijn Stoïcijnse Reis</h2>
        <p>Mijn reis naar het Stoïcisme begon met een inspirerend gesprek met mijn vriend Paul, die de deur opende naar een wereld van innerlijke rust en filosofische reflectie. Het was echter de hedendaagse schrijver Ryan Holiday die deze oude wijsheid levend maakte met zijn pragmatische benadering, en mij leerde hoe deze principes in de moderne tijd toe te passen.</p>
      
        <h3>Mijn Dagelijkse Praktijken:</h3>
      
        <h4>Ochtendreflectie:</h4>
        <p>Elke ochtend begin ik met een moment van stilte waarin ik mij focus op wat de dag zal brengen, geleid door de Stoïcijnse principes van aanvaarding en doelgerichtheid.</p>
      
        <h4>Journaling:</h4>
        <p>Het bijhouden van een dagboek heeft me geholpen om mijn gedachten en acties in lijn te brengen met de Stoïcijnse waarden, en elke dag bewuster en met meer intentie te leven.</p>
      
        <h4>Meditatieve Wandelingen:</h4>
        <p>Tijdens dagelijkse wandelingen overdenk ik de natuur en onze plaats daarin, reflecterend op de Stoïcijnse opvatting dat wij deel uitmaken van een groter geheel.</p>
      
        <h4>Lezen en Leren:</h4>
        <p>De diepe duik in Stoïcijnse teksten is een essentieel onderdeel van mijn routine, waarbij de boeken van Ryan Holiday fungeren als gidsen op dit pad. Zijn interpretatie van Stoïcijnse ideeën heeft mijn begrip en praktijk van de filosofie enorm verrijkt.</p>
      
        <h4>Avondreflectie:</h4>
        <p>De dag afsluiten met zelfreflectie is cruciaal; het is een tijd om te waarderen wat goed ging en te leren van wat beter kan, met het doel om voortdurend te groeien.</p>
      
        <p>Mijn engagement met het Stoïcisme, dat zijn oorsprong vond bij mijn vriend en verdieping kreeg door de geschriften van Ryan Holiday, heeft me gevormd tot een persoon die streeft naar wijsheid, zelfbeheersing, rechtvaardigheid en moed. Deze website is een uitnodiging om samen de tijdloze lessen van het Stoïcisme te verkennen en te integreren in het complexe weefsel van ons moderne leven.</p>
      `,
    },
  ];

  generateCardConfig(person: (typeof this.people)[0]) {
    return JSON.stringify({
      imageSrc: person.image,
      imageAlt: person.name,
      // Specify other configurations like imagePosition as needed
      imagePosition: 'top-right', // Example position
    });
  }
}
