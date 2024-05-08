import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
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
      html, body, section {
        margin: 0;
        padding: 0;
      }
    </style>
  `,
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
