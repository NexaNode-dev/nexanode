import type { Meta, StoryObj } from '@storybook/angular';
import { NexaNodeAdminAuthLoginComponent } from './login.component';

import {
  permissionsFactory,
  userFactory,
} from '@nexanode/testing-data-mocks-utils';

import { userEvent, within } from '@storybook/test';
import { expect } from '@storybook/test';

const user = userFactory();
const permissions = permissionsFactory();

const meta: Meta<NexaNodeAdminAuthLoginComponent> = {
  component: NexaNodeAdminAuthLoginComponent,
  title: 'NexaNodeAdminAuthLoginComponent',
};
export default meta;
type Story = StoryObj<NexaNodeAdminAuthLoginComponent>;

export const Primary: Story = {
  args: {},
};

export const LoginFlow: Story = {
  parameters: {
    mockData: [
      {
        url: '/api/auth/login',
        method: 'POST',
        response: { user, permissions },
        status: 200,
        delay: 1000,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const credential = canvas.getByLabelText('Credential');
    await userEvent.type(credential, user.email, { delay: 50 });
    const password = canvas.getByLabelText('Password');
    await userEvent.type(password, user.password || 'password', { delay: 50 });
    const submit = canvas.getByRole('button', { name: 'Login' });
    await userEvent.click(submit);
    await setTimeout(() => {
      expect(canvas.getByText('Logged in successfully!')).toBeInTheDocument();
    }, 1200);
  },
};
