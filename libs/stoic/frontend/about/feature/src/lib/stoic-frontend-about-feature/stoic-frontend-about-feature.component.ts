import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'nexanode-stoic-frontend-about-feature',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './stoic-frontend-about-feature.component.html',
  styleUrl: './stoic-frontend-about-feature.component.css',
})
export class StoicFrontendAboutFeatureComponent {
  people = [
    {
      name: 'Olivier Vanistendael',
      image: 'assets/stoic-olivier.png',
      description: faker.lorem.paragraphs(8, '<br>\n')
    },
    {
      name: 'Johan Vrolix',
      image: 'assets/stoic-johan.png',
      description: faker.lorem.paragraphs(8, '<br>\n')
    },
    // Voeg meer personen toe zoals nodig
  ];
}
