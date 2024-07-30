import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeEventsDetailComponent } from './detail.component';

const events = eventsFactory();
const event = events[0];

import { within } from '@storybook/test';
import { expect } from '@storybook/test';
import { eventsFactory } from '@nexanode/testing-data-mocks-utils';

const meta: Meta<NexanodeEventsDetailComponent> = {
  component: NexanodeEventsDetailComponent,
  title: 'NexanodeEventsDetailComponent',
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
type Story = StoryObj<NexanodeEventsDetailComponent>;

export const Primary: Story = {
  args: {
    id: event.id,
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/detail works!/gi)).toBeTruthy();
  },
};
