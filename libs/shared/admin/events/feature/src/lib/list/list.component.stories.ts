import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminEventsListComponent } from './list.component';
import { eventsFactory } from '@nexanode/testing-data-mocks-utils';

const events = eventsFactory();

const meta: Meta<NexanodeAdminEventsListComponent> = {
  component: NexanodeAdminEventsListComponent,
  title: 'NexanodeAdminEventsListComponent',
  parameters: {
    mockData: [
      {
        url: '/api/events',
        method: 'GET',
        response: events,
        status: 200,
        delay: 1000,
      }
    ]
  }
};
export default meta;
type Story = StoryObj<NexanodeAdminEventsListComponent>;

export const Primary: Story = {
  args: {},
};

