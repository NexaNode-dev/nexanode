import type { Meta, StoryObj } from '@storybook/angular';
import { DetailComponent } from './detail.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DetailComponent> = {
  component: DetailComponent,
  title: 'DetailComponent',
};
export default meta;
type Story = StoryObj<DetailComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/detail works!/gi)).toBeTruthy();
  },
};
