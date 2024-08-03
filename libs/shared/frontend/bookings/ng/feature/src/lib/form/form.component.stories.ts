import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeBookingsFormComponent } from './form.component';

const event = eventFactory();
const bookings = bookingsFactory();
const newBooking = bookingFactory();

import {
  bookingFactory,
  bookingsFactory,
  eventFactory,
} from '@nexanode/testing-data-mocks-utils';

const meta: Meta<NexanodeBookingsFormComponent> = {
  component: NexanodeBookingsFormComponent,
  title: 'NexanodeBookingsFormComponent',
  args: {
    event,
  },
  parameters: {
    mockData: [
      {
        url: '/api/bookings',
        method: 'GET',
        response: bookings,
        status: 200,
      },
      {
        url: '/api/bookings',
        method: 'POST',
        response: newBooking,
        status: 201,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<NexanodeBookingsFormComponent>;

export const Primary: Story = {
  args: {},
};
