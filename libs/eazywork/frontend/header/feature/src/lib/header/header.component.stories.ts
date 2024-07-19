import type { Meta, StoryObj } from '@storybook/angular';
import { EazyworkHeaderComponent } from './header.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<EazyworkHeaderComponent> = {
  component: EazyworkHeaderComponent,
  title: 'EazyworkHeaderComponent',
};
export default meta;
type Story = StoryObj<EazyworkHeaderComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/header works!/gi)).toBeTruthy();
  },
};
