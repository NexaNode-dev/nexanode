import type { Meta, StoryObj } from '@storybook/react';
import { Landing } from './landing';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Landing> = {
  component: Landing,
  title: 'Landing',
};
export default meta;
type Story = StoryObj<typeof Landing>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Zen Dens/gi)).toBeTruthy();
  },
};
