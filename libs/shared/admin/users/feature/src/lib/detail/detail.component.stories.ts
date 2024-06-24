import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminUsersDetailComponent } from './detail.component';

import { userFactory, usersFactory } from '@nexanode/testing-data-mocks-utils';

const users = usersFactory();
const user = userFactory({ id: users[0].id });

const meta: Meta<NexanodeAdminUsersDetailComponent> = {
  component: NexanodeAdminUsersDetailComponent,
  title: 'NexanodeAdminUsersDetailComponent',
  parameters: {
    mockData: [
      {
        url: '/api/users',
        method: 'GET',
        status: 200,
        response: users,
        delay: 1000,
      },
      {
        url: `/api/users/${user.id}`,
        method: 'GET',
        status: 200,
        response: user,
        delay: 1500,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<NexanodeAdminUsersDetailComponent>;

export const Primary: Story = {
  args: {
    id: user.id,
  },
};
