import type { Meta, StoryObj } from '@storybook/angular';
import { IntroComponent } from './intro.component';

const meta: Meta<IntroComponent> = {
  component: IntroComponent,
  title: 'IntroComponent',
};
export default meta;
type Story = StoryObj<IntroComponent>;

export const Primary: Story = {
  args: {},
};
