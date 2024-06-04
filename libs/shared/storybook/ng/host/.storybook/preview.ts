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
        value: '#5da6e5',
        control: 'color',
      },
      primary: {
        value: '#2c82c9',
        control: 'color',
      },
      'primary-dark': {
        value: '#1a5d9c',
        control: 'color',
      },
      'secondary-light': {
        value: '#e5c8e5',
        control: 'color',
      },
      secondary: {
        value: '#c8a2c8',
        control: 'color',
      },
      'secondary-dark': {
        value: '#a078a0',
        control: 'color',
      },
      'tertiary-light': {
        value: '#5ec768',
        control: 'color',
      },
      tertiary: {
        value: '#28a745',
        control: 'color',
      },
      'tertiary-dark': {
        value: '#1b6e30',
        control: 'color',
      },
      'quaternary-light': {
        value: '#ffa64d',
        control: 'color',
      },
      quaternary: {
        value: '#ff8c00',
        control: 'color',
      },
      'quaternary-dark': {
        value: '#cc6e00',
        control: 'color',
      },
    },
  },
};

export default preview;
