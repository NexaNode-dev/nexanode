import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminUsersListComponent } from './list.component';

import { usersFactory } from '@nexanode/testing-data-mocks-utils';

const meta: Meta<NexanodeAdminUsersListComponent> = {
  component: NexanodeAdminUsersListComponent,
  title: 'NexanodeAdminUsersListComponent',
  parameters: {
    mockData: [
      {
        url: '/api/users',
        method: 'GET',
        status: 200,
        response: usersFactory(),
        delay: 1000,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<NexanodeAdminUsersListComponent>;

export const Primary: Story = {
  args: {},
};

export const Error: Story = {
  parameters: {
    mockData: [
      {
        url: '/api/users',
        method: 'GET',
        status: 404,
        response: {},
      },
    ],
  },
};

export const Loading: Story = {
  parameters: {
    mockData: [
      {
        url: '/api/users',
        method: 'GET',
        delay: 99999999,
        response: {},
        status: 200,
      },
    ],
  },
};
