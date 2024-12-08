import type { Meta, StoryObj } from '@storybook/angular';
import { TeamComponent } from './team.component';

import { within, expect } from '@storybook/test';

const meta: Meta<TeamComponent> = {
  component: TeamComponent,
  title: 'TeamComponent',
};
export default meta;
type Story = StoryObj<TeamComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/team works!/gi)).toBeTruthy();
  },
};
