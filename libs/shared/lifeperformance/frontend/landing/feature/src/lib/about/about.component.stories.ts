import type { Meta, StoryObj } from '@storybook/angular';
import { AboutComponent } from './about.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AboutComponent> = {
  component: AboutComponent,
  title: 'AboutComponent',
};
export default meta;
type Story = StoryObj<AboutComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/about works!/gi)).toBeTruthy();
  },
};
