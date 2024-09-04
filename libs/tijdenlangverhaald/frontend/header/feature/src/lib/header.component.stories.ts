import type { Meta, StoryObj } from '@storybook/angular';
import { TijdenlangHeaderComponent } from './header.component';

const meta: Meta<TijdenlangHeaderComponent> = {
  component: TijdenlangHeaderComponent,
  title: 'TijdenlangHeaderComponent',
};
export default meta;
type Story = StoryObj<TijdenlangHeaderComponent>;

export const Primary: Story = {
  args: {},
};
