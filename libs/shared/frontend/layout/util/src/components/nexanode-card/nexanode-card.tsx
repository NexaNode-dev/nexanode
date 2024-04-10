import { Component, h, Prop } from '@stencil/core';
interface CardConfig {
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'top-left' | 'top-right' | 'cover-header' | 'inside-content';
  // Add other configuration options as needed
}

@Component({
  tag: 'nexanode-card',
  styleUrl: 'nexanode-card.css',
  shadow: true,
})
export class NexanodeCard {
  @Prop() header: string;
  @Prop() content: string;
  @Prop() footer: string;
  @Prop() config: string;

  private getDefaultConfig(): CardConfig {
    return JSON.parse(this.config || '{}');
  }

  renderImage(config: CardConfig) {
    if (!config.imageSrc) return null;
    return <img src={config.imageSrc} alt={config.imageAlt || 'Card Image'} class='card-image' />;
  }

  render() {
    const config = this.getDefaultConfig();

    return (
      <div class="card">
        {config.imagePosition === 'cover-header'
          ? this.renderImage(config)
          : null}
        {this.header ? (
          <div
            class={{
              'card-header': true,
              'justify-between': config.imagePosition === 'top-right',
              'flex-row-reverse': config.imagePosition === 'top-right',
            }}
          >
            {config.imagePosition === 'top-left' ||
            config.imagePosition === 'top-right'
              ? this.renderImage(config)
              : null}
            <div class="header-content">
              <h2 class="card-title">{this.header}</h2>
            </div>
          </div>
        ) : null}

        <div class="card-content">
          {config.imagePosition === 'inside-content'
            ? this.renderImage(config)
            : null}
          <p innerHTML={this.content}></p>
        </div>
        {this.footer ? <div class="card-footer">{this.footer}</div> : null}
      </div>
    );
  }
}
