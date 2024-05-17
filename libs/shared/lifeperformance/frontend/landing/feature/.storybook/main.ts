import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook'
  ],

  framework: {
    name: '@storybook/angular',
    options: {},
  },

  previewHead: (head) => `
    ${head}
    <style>
      :root {
        --color-primary: #2e6259;
        --color-secondary: #f1efe7;
        --color-tertiary: #daa520;
        --color-quaternary: #404040;
      }
      
      * {
        box-sizing: border-box;
      }

      html, body, section {
        margin: 0;
        padding: 0;
      }
    </style>
  `,

  docs: {}
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
