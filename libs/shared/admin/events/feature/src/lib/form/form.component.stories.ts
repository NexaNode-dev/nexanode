import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminEventsFormComponent } from './form.component';
import { eventsFactory } from '@nexanode/testing-data-mocks-utils';

const events = eventsFactory();
const event = events[0];

const meta: Meta<NexanodeAdminEventsFormComponent> = {
  component: NexanodeAdminEventsFormComponent,
  title: 'NexanodeAdminEventsFormComponent',
};
export default meta;
type Story = StoryObj<NexanodeAdminEventsFormComponent>;

export const Primary: Story = {
  args: {},
};

export const Updating: Story = {
  args: {
    id: event.id,
  },
  parameters: {
    mockData: [
      {
        url: '/api/events',
        method: 'GET',
        response: events,
        status: 200,
      },
      {
        url: `/api/events/${event.id}`,
        method: 'GET',
        response: event,
        status: 200,
        delay: 1000,
      }
    ]
  }
};
