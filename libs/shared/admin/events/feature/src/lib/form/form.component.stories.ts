import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminEventsFormComponent } from './form.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<NexanodeAdminEventsFormComponent> = {
  component: NexanodeAdminEventsFormComponent,
  title: 'NexanodeAdminEventsFormComponent',
};
export default meta;
type Story = StoryObj<NexanodeAdminEventsFormComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/form works!/gi)).toBeTruthy();
  },
};
