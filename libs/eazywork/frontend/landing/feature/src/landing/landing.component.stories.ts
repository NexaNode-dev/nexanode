import type { Meta, StoryObj } from '@storybook/angular';
import { EazyWorkLandingComponent } from './landing.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<EazyWorkLandingComponent> = {
  component: EazyWorkLandingComponent,
  title: 'EazyWorkLandingComponent',
};
export default meta;
type Story = StoryObj<EazyWorkLandingComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/landing works!/gi)).toBeTruthy();
  },
};
