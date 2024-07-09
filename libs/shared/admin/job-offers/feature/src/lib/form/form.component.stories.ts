import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminJobOffersFormComponent } from './form.component';

const meta: Meta<NexanodeAdminJobOffersFormComponent> = {
  component: NexanodeAdminJobOffersFormComponent,
  title: 'NexanodeAdminJobOffersFormComponent',
};
export default meta;
type Story = StoryObj<NexanodeAdminJobOffersFormComponent>;

export const Primary: Story = {
  args: {},
};
