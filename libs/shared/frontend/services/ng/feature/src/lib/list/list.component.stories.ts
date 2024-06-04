import type { Meta, StoryObj } from '@storybook/angular';
import { NexaNodeServicesListComponent } from './list.component';

import { servicesFactory } from '@nexanode/testing-data-mocks-utils';

const meta: Meta<NexaNodeServicesListComponent> = {
  component: NexaNodeServicesListComponent,
  title: 'ServicesListComponent',
  parameters: {
    mockData: [
      {
        url: '/api/services',
        method: 'GET',
        status: 200,
        response: servicesFactory(),
        delay: 1000,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<NexaNodeServicesListComponent>;

export const Primary: Story = {
  args: {},
};

export const CustomTitle: Story = {
  args: {
    title: 'Offerings',
  },
};
