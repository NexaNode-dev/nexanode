import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ICategory, IService } from '@nexanode/domain-interfaces';

@customElement('nexanode-services-list-one-layout')
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

  static override styles = css`
    h3 {
      font-size: 1.5rem; /* 2xl */
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 768px) {
        font-size: 1.875rem; /* 3xl */
      }
    }

    h3,
    h4,
    li {
      margin-bottom: 1rem;
      font-style: italic;
      color: var(--tertiary); /* Replace with your tertiary color value */
      font-family: 'Archivo Black', sans-serif;
    }

    p {
      margin-bottom: 1rem;
      color: var(--quaternary); /* Replace with your quaternary color value */
      @media (min-width: 768px) {
        font-size: 1.5rem; /* 2xl */
      }
      font-family: 'Aileron', sans-serif;
      font-style: normal;
    }

    .h4 {
      font-size: 1.25rem; /* xl */
    }

    img {
      width: 100%;
      height: auto;
      margin-bottom: 1rem;
      border: 4px solid var(--tertiary); /* Replace with your tertiary color value */
      @media (min-width: 768px) {
        border-width: 8px;
      }
      border-radius: 1rem;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    ul li {
      color: var(--tertiary); /* Replace with your tertiary color value */
      @media (min-width: 768px) {
        font-size: 1.5rem; /* 2xl */
      }
    }

    .note {
      font-size: 0.875rem; /* sm */
      @media (min-width: 768px) {
        font-size: 1.25rem; /* xl */
      }
    }
  `;

  override render() {
    console.log('servicesByCategory', this.servicesByCategory);
    return html` ${this.servicesByCategory.map(
      (item) =>
        html`<h3>${item.category.name}</h3>
          <p>${item.category.description}</p>
          <ul>
            ${item.services.map(
              (service) =>
                html`<li>
                  <h4>${service.name}</h4>
                  <p>${service.summary}</p>
                </li>`,
            )}
          </ul>
          <p class="note">
            (All onze ${item.category.name} worden op maat gemaakt van jouw
            bedrijf of organisatie na een grondige intake)
          </p> `,
    )}`;
  }
}
