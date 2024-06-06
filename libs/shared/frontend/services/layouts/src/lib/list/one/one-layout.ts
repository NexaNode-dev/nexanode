import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ICategory, IService } from '@nexanode/domain-interfaces';

@customElement('one-layout')
export class OneServicesLayout extends LitElement {
  @property({ type: String }) override title = 'One Layout';
  @property() services: IService[] = [];
  @property() categories: ICategory[] = [];
  @property() servicesByCategory: {
    category: ICategory;
    services: IService[];
  }[] = [
    {
      category: {
        id: '',
        name: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      services: [],
    },
  ];

  override render() {
    console.log('servicesByCategory', this.servicesByCategory);
    return html` ${this.servicesByCategory.map(
      (item) =>
        html`<h3>${item.category.name}</h3>
          <p>${item.category.description}</p>
          <ol>
            ${item.services.map(
              (service) =>
                html`<li>
                  <h4>${service.name}</h4>
                  <p>${service.description}</p>
                </li>`,
            )}
          </ol>
          <p class="note">
            (All onze ${item.category.name}s worden op maat gemaakt van jouw bedrijf of
            organisatie na een grondige intake)
          </p> `,
    )}`;
  }
}
