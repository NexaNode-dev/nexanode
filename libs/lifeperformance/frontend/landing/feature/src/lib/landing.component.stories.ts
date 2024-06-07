import type { Meta, StoryObj } from '@storybook/angular';
import { LandingComponent } from './landing.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<LandingComponent> = {
  component: LandingComponent,
  title: 'LandingComponent',
};
export default meta;
type Story = StoryObj<LandingComponent>;

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
