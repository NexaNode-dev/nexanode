import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../../../../../**/ng/feature/**/*.@(mdx|stories.@(js|jsx|ts|tsx))', '../../../../../**/ng/ui/**/*.@(mdx|stories.@(js|jsx|ts|tsx))', '../../../../../{stoic,lifeperformance,tijdenlangverhaald,eazywork}/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'storybook-addon-mock',
    'storybook-addon-angular-router',
    '@ljcl/storybook-addon-cssprops',
    '@chromatic-com/storybook'
  ],

  framework: {
    name: '@storybook/angular',
    options: {},
  },

  docs: {}
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
