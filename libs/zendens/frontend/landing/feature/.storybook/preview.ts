import { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    cssprops: {
      disable: false,
      'color-primary': {
        value: '#ff0000',
        control: 'color',
        description: 'The primary color',
      },
      'color-secondary': {
        value: '#00ff00',
        control: 'color',
        description: 'The secondary color',
      },
    },
  },
};

export default preview;
