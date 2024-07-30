import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeEventsListComponent } from './list.component';

const events = eventsFactory();

import { eventsFactory } from '@nexanode/testing-data-mocks-utils';

const meta: Meta<NexanodeEventsListComponent> = {
  component: NexanodeEventsListComponent,
  title: 'NexanodeEventsListComponent',
  parameters: {
    mockData: [
      {
        url: '/api/events',
        method: 'GET',
        response: events,
        status: 200,
        delay: 1000,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<NexanodeEventsListComponent>;

export const Primary: Story = {
  args: {},
};

export const CustomTitle: Story = {
  args: {
    title: 'Aankomende Evenementen',
  },
};
