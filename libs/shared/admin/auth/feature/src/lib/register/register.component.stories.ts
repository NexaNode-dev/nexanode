import type { Meta, StoryObj } from '@storybook/angular';
import { NexaNodeAdminAuthRegisterComponent } from './register.component';
import { userFactory } from '@nexanode/testing-data-mocks-utils';

const user = userFactory();

import { within, expect, userEvent } from '@storybook/test';

const meta: Meta<NexaNodeAdminAuthRegisterComponent> = {
  component: NexaNodeAdminAuthRegisterComponent,
  title: 'NexaNodeAdminAuthRegisterComponent',
};
export default meta;
type Story = StoryObj<NexaNodeAdminAuthRegisterComponent>;

export const Primary: Story = {
  args: {},
};

export const RegisterFlow: Story = {
  parameters: {
    mockData: [
      {
        url: '/api/auth/register',
        method: 'POST',
        response: user,
        status: 200,
        delay: 1000,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const email = canvas.getByLabelText('Email');
    await userEvent.type(email, user.email, { delay: 50 });
    const password = canvas.getByLabelText('Password');
    await userEvent.type(password, user.password || 'password', { delay: 50 });
    const confirmPassword = canvas.getByLabelText('Confirm Password');
    await userEvent.type(confirmPassword, user.password || 'password', {
      delay: 50,
    });
    const submit = canvas.getByRole('button', { name: 'Register' });
    await userEvent.click(submit);
    await setTimeout(() => {
      expect(canvas.getByText('Registered successfully!')).toBeInTheDocument();
    }, 1200);
  },
};
