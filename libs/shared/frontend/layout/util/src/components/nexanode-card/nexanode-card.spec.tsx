import { newSpecPage } from '@stencil/core/testing';
import { NexanodeCard } from './nexanode-card';

describe('nexanode-card', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [NexanodeCard],
      html: '<nexanode-card></nexanode-card>',
    });
    expect(root).toEqualHtml(`
      <nexanode-card>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </nexanode-card>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [NexanodeCard],
      html: `<nexanode-card first="Stencil" last="'Don't call me a framework' JS"></nexanode-card>`,
    });
    expect(root).toEqualHtml(`
      <nexanode-card first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </nexanode-card>
    `);
  });
});
