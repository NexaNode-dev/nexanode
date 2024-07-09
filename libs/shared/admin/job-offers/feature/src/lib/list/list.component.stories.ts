import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminJobOffersListComponent } from './list.component';
import { jobOffersFactory } from '@nexanode/testing-data-mocks-utils';

const jobOffers = jobOffersFactory();

const meta: Meta<NexanodeAdminJobOffersListComponent> = {
  component: NexanodeAdminJobOffersListComponent,
  title: 'NexanodeAdminJobOffersListComponent',
  parameters: {
    mockData: [
      {
        url: 'api/job-offers',
        method: 'GET',
        response: jobOffers,
        status: 200,
        delay: 1000,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<NexanodeAdminJobOffersListComponent>;

export const Primary: Story = {
  args: {},
};

export const Error: Story = {
  args: {},
  parameters: {
    mockData: [
      {
        url: 'api/job-offers',
        method: 'GET',
        status: 500,
        response: {},
      },
    ],
  },
};

export const Loading: Story = {
  args: {},
  parameters: {
    mockData: [
      {
        url: 'api/job-offers',
        method: 'GET',
        response: jobOffers,
        status: 200,
        delay: 999999,
      },
    ],
  },
};
