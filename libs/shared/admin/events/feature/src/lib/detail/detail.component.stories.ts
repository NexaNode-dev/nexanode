import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminEventsDetailComponent } from './detail.component';
import { eventsFactory } from '@nexanode/testing-data-mocks-utils';

const events = eventsFactory();
const event = events[0];

const meta: Meta<NexanodeAdminEventsDetailComponent> = {
  component: NexanodeAdminEventsDetailComponent,
  title: 'NexanodeAdminEventsDetailComponent',
  parameters: {
    mockData: [
      {
        url: '/api/events',
        method: 'GET',
        response: events,
        status: 200,
        delay: 1000,
      },
      {
        url: `/api/events/${event.id}`,
        method: 'GET',
        response: event,
        status: 200,
        delay: 1000,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<NexanodeAdminEventsDetailComponent>;

export const Primary: Story = {
  args: {
    id: event.id,
  },
};
