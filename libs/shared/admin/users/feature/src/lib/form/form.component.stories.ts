import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminUsersFormComponent } from './form.component';
import { usersFactory } from '@nexanode/testing-data-mocks-utils';
import { faker } from '@faker-js/faker';

import { userEvent, within } from '@storybook/test';

const number = faker.number.int({ min: 1, max: 10 });
const users = usersFactory(number, { password: undefined });
const user = users[0];

const meta: Meta<NexanodeAdminUsersFormComponent> = {
  component: NexanodeAdminUsersFormComponent,
  title: 'NexanodeAdminUsersFormComponent',
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
type Story = StoryObj<NexanodeAdminUsersFormComponent>;

export const Primary: Story = {
  args: {},
};

export const Update: Story = {
  args: {
    id: user.id,
  },
};

export const Loading: Story = {
  args: Update.args,
  parameters: {
    mockData: [
      { ...meta.parameters?.['mockData'][0], delay: 99999999 },
      {
        url: `/api/users/${user.id}`,
        method: 'GET',
        status: 200,
        response: user,
        delay: 99999999,
      },
    ],
  },
};

export const Error: Story = {
  args: Update.args,
  parameters: {
    mockData: [
      { ...meta.parameters?.['mockData'][0] },
      {
        url: `/api/users/${user.id}`,
        method: 'GET',
        status: 404,
        response: {},
      },
    ],
  },
};

export const CreateMinimal: Story = {
  args: {},
  parameters: {
    mockData: [
      { ...meta.parameters?.['mockData'][0], delay: 0 },
      {
        url: '/api/users',
        method: 'POST',
        status: 201,
        response: {},
        delay: 1000,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const email = canvas.getByTestId('email');
    await userEvent.type(email, user.email);

    const submit = canvas.getByRole('button', { name: 'Submit' });
    await userEvent.click(submit);
  },
};
