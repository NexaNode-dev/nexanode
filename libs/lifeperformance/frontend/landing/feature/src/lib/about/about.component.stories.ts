import type { Meta, StoryObj } from '@storybook/angular';
import { AboutComponent } from './about.component';

const meta: Meta<AboutComponent> = {
  component: AboutComponent,
  title: 'AboutComponent',
};
export default meta;
type Story = StoryObj<AboutComponent>;

export const Primary: Story = {
  args: {},
};
