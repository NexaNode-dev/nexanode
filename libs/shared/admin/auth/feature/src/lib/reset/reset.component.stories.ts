import type { Meta, StoryObj } from '@storybook/angular';
import { NexaNodeAdminAuthResetComponent } from './reset.component';

import { userEvent, within } from '@storybook/test';
import { expect } from '@storybook/test';
import { userFactory } from '@nexanode/testing-data-mocks-utils';

const user = userFactory();

const meta: Meta<NexaNodeAdminAuthResetComponent> = {
  component: NexaNodeAdminAuthResetComponent,
  title: 'NexaNodeAdminAuthResetComponent',
  parameters: {
    mockData: [
      {
        url: '/api/auth/reset',
        method: 'PATCH',
        response: { user },
        status: 200,
        delay: 1000,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<NexaNodeAdminAuthResetComponent>;

export const Primary: Story = {
  args: {
    token: user.accessToken,
  },
};

export const ResetFlow: Story = {
  args: {
    token: user.accessToken,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const password = canvas.getByLabelText('Password');
    await userEvent.type(password, user.password || 'password', { delay: 50 });
    const confirmPassword = canvas.getByLabelText('Confirm Password');
    await userEvent.type(confirmPassword, user.password || 'password', {
      delay: 50,
    });
    const submit = canvas.getByRole('button', { name: 'Reset Password' });
    await userEvent.click(submit);

    setTimeout(async () => {
      await expect(
        canvas.getByText('Password reset successfully!'),
      ).toBeInTheDocument();
    }, 1200);
  },
};
