import { provideHttpClient, withFetch } from '@angular/common/http';
import { Preview, applicationConfig } from '@storybook/angular';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(withFetch())],
    }),
  ],

  parameters: {
    cssprops: {
      'primary-light': {
        value: '#4a8ec3',
        control: 'color',
      },
      primary: {
        value: '#2374ab',
        control: 'color',
      },
      'primary-dark': {
        value: '#b5c85',
        control: 'color',
      },
      'secondary-light': {
        value: '#ffbf33',
        control: 'color',
      },
      secondary: {
        value: '#ffaa00',
        control: 'color',
      },
      'secondary-dark': {
        value: '#cc8800',
        control: 'color',
      },
      'tertiary-light': {
        value: '#ffffff',
        control: 'color',
      },
      tertiary: {
        value: '#f1f3f5',
        control: 'color',
      },
      'tertiary-dark': {
        value: '#dde1e5',
        control: 'color',
      },
      'quaternary-light': {
        value: '#3a5278',
        control: 'color',
      },
      quaternary: {
        value: '#1e3a5f',
        control: 'color',
      },
      'quaternary-dark': {
        value: '#142641',
        control: 'color',
      },
    },
  },

  tags: ['autodocs']
};

export default preview;
