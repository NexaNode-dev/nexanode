import type { Meta, StoryObj } from '@storybook/angular';
import { ServicesComponent } from './services.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ServicesComponent> = {
  component: ServicesComponent,
  title: 'ServicesComponent',
};
export default meta;
type Story = StoryObj<ServicesComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/services works!/gi)).toBeTruthy();
  },
};
