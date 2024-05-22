import type { Meta, StoryObj } from '@storybook/angular';
import { ActivateComponent } from './activate.component';
import { applicationConfig, moduleMetadata } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';

const meta: Meta<ActivateComponent> = {
  component: ActivateComponent,
  title: 'ActivateComponent',
  args: {
    id: 'id',
    token: 'token',
  },
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        provideRouter([], withComponentInputBinding()),
      ],
    }),
    moduleMetadata({
      imports: [],
    }),
  ],
  parameters: {
    cssprops: {
      'primary-light': {
        control: 'color',
      },
      primary: {
        control: 'color',
      },
      'primary-dark': {
        control: 'color',
      },
      'secondary-light': {
        control: 'color',
      },
      secondary: {
        control: 'color',
      },
      'secondary-dark': {
        control: 'color',
      },
      'tertiary-light': {
        control: 'color',
      },
      tertiary: {
        control: 'color',
      },
      'tertiary-dark': {
        control: 'color',
      },
      'neutral-light': {
        control: 'color',
      },
      neutral: {
        control: 'color',
      },
      'neutral-dark': {
        control: 'color',
      },
    },
    mockData: [
      {
        url: `/api/auth/activate/id`,
        body: { token: 'token' },
        method: 'PATCH',
        status: 200,
        response: true,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<ActivateComponent>;

export const Primary: Story = {};

export const Heading: Story = {
  args: {
    id: 'id',
    token: 'token',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/activate works!/gi)).toBeTruthy();
  },
};
