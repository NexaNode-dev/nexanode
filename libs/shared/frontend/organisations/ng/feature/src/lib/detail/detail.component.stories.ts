import type { Meta, StoryObj } from '@storybook/angular';
import { DetailComponent } from './detail.component';

import { within, expect } from '@storybook/test';

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
