import type { Meta, StoryObj } from '@storybook/angular';
import { NexaNodeAdminAuthForgotComponent } from './forgot.component';

import { userEvent, within } from '@storybook/test';
import { expect } from '@storybook/test';
import { userFactory } from '@nexanode/testing-data-mocks-utils';

const user = userFactory();

const meta: Meta<NexaNodeAdminAuthForgotComponent> = {
  component: NexaNodeAdminAuthForgotComponent,
  title: 'NexaNodeAdminAuthForgotComponent',
  parameters: {
    mockData: [
      {
        url: '/api/auth/forgot',
        method: 'POST',
        response: { user },
        status: 201,
        delay: 1000,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<NexaNodeAdminAuthForgotComponent>;

export const Primary: Story = {
  args: {},
};

export const ForgotFlow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const credential = canvas.getByLabelText('Username/Email');
    await userEvent.type(credential, user.email, { delay: 50 });
    const submit = canvas.getByRole('button', { name: 'Forgot Password' });
    await userEvent.click(submit);
    setTimeout(async () => {
      await expect(
        canvas.getByText(
          'If you have an account using the provided credentials, a reset password link was sent to your email!',
        ),
      ).toBeInTheDocument();
    }, 1200);
  },
};
