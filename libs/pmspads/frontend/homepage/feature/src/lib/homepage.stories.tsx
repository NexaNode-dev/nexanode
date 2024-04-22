import type { Meta, StoryObj } from '@storybook/react';
import { Homepage } from './homepage';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Homepage> = {
  component: Homepage,
  title: 'Homepage',
};
export default meta;
type Story = StoryObj<typeof Homepage>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/PMS Pads/gi)).toBeTruthy();
  },
};
