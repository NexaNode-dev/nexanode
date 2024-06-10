import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

interface CardConfig {
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'top-left' | 'top-right' | 'cover-header' | 'inside-content';
  // Add other configuration options as needed
}

@customElement('nexanode-about-team-layout')
export class NexaNodeAboutTeamLayout extends LitElement {
  @property() header = '';
  @property() content = '';
  @property() footer = '';
  @property() config = '';

  static override styles = css`
    :host {
      display: block;
      padding: 16px;
    }

    .card {
      display: block;
      background-color: var(--primary-light, #fff);
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: box-shadow 0.3s ease-in-out;
      width: 45vw; /* Adjust based on your layout */
      margin: 1rem;
    }

    .card:hover {
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    }

    .card-header,
    .card-footer {
      background-color: var(--secondary-light, #f0f0f0);
      padding: 12px 20px;
    }

    .card-header {
      display: flex;
      align-items: center;
      padding: 1rem;
    }

    .card-header .header-content h2 {
      font-size: 2.5rem;
    }

    .card-title {
      font-size: 20px;
      margin: 0;
    }

    .card-content {
      padding: 1.5rem;
    }

    .card-image {
      width: 7rem;
      height: auto;
      flex-shrink: 0;
      aspect-ratio: 1/1;
      object-fit: cover;
    }

    .justify-between {
      justify-content: space-between;
    }

    .flex-row-reverse {
      flex-direction: row-reverse;
    }

    .header-content {
      flex-grow: 1;
    }

    /* Additional responsive adjustments */
    @media (max-width: 768px) {
      .card {
        max-width: 100%;
      }
    }
  `;

  private getDefaultConfig(): CardConfig {
    return JSON.parse(this.config || '{}');
  }

  renderImage(config: CardConfig) {
    if (!config.imageSrc) return null;
    return html`
      <img
        src=${config.imageSrc}
        alt=${config.imageAlt || 'Card Image'}
        class="card-image"
      />
    `;
  }

  override render() {
    const config = this.getDefaultConfig();

    return html`
      <div class="card">
        ${config.imagePosition === 'cover-header'
          ? this.renderImage(config)
          : null}
        ${this.header
          ? html`
              <div
                class="card-header ${config.imagePosition === 'top-right'
                  ? 'justify-between flex-row-reverse'
                  : ''}"
              >
                ${config.imagePosition === 'top-left' ||
                config.imagePosition === 'top-right'
                  ? this.renderImage(config)
                  : null}
                <div class="header-content">
                  <h2 class="card-title">${this.header}</h2>
                </div>
              </div>
            `
          : null}

        <div class="card-content">
          ${config.imagePosition === 'inside-content'
            ? this.renderImage(config)
            : null}
          <p>${unsafeHTML(this.content)}</p>
        </div>
        ${this.footer
          ? html`<div class="card-footer">${this.footer}</div>`
          : null}
      </div>
    `;
  }
}
