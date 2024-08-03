import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeBookingsStatusComponent } from './status.component';
import { bookingsFactory } from '@nexanode/testing-data-mocks-utils';

const bookings = bookingsFactory(3, [
  { status: 'pending' },
  { status: 'confirmed' },
  { status: 'cancelled' },
]);
const pendingBooking = bookings[0];
const confirmedBooking = bookings[1];
const cancelledBooking = bookings[2];

const meta: Meta<NexanodeBookingsStatusComponent> = {
  component: NexanodeBookingsStatusComponent,
  title: 'NexanodeBookingsStatusComponent',
  parameters: {
    mockData: [
      {
        url: '/api/bookings',
        method: 'GET',
        response: bookings,
        status: 200,
        delay: 1000,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<NexanodeBookingsStatusComponent>;

export const Pending: Story = {
  args: {
    id: pendingBooking.id,
  },
  parameters: {
    mockData: [
      {
        ...meta.parameters?.['mockData'][0],
      },
      {
        url: `/api/bookings/${pendingBooking.id}`,
        method: 'GET',
        response: pendingBooking,
        status: 200,
        delay: 1000,
      },
      {
        url: `/api/bookings/${pendingBooking.id}/pay`,
        method: 'POST',
        response:
          'https://demo.mollie.com/en/one-off-payments/?name=LifePerformance&loc=BE&methods=BCCCKBBPAP',
        status: 201,
        body: null,
      },
    ],
  },
};

export const Confirmed: Story = {
  args: {
    id: confirmedBooking.id,
  },
  parameters: {
    mockData: [
      {
        ...meta.parameters?.['mockData'][0],
      },
      {
        url: `/api/bookings/${confirmedBooking.id}`,
        method: 'GET',
        response: confirmedBooking,
        status: 200,
        delay: 1000,
      },
    ],
  },
};

export const Cancelled: Story = {
  args: {
    id: cancelledBooking.id,
  },
  parameters: {
    mockData: [
      {
        ...meta.parameters?.['mockData'][0],
      },
      {
        url: `/api/bookings/${cancelledBooking.id}`,
        method: 'GET',
        response: cancelledBooking,
        status: 200,
        delay: 1000,
      },
    ],
  },
};
