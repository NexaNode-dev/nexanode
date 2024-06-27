import type { Meta, StoryObj } from '@storybook/angular';
import { NexaNodeAdminAuthActivateComponent } from './activate.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { userFactory } from '@nexanode/testing-data-mocks-utils';

const user = userFactory();

const meta: Meta<NexaNodeAdminAuthActivateComponent> = {
  component: NexaNodeAdminAuthActivateComponent,
  title: 'NexaNodeAdminAuthActivateComponent',
  parameters: {
    mockData: [
      {
        url: `/api/auth/activate/${user.id}`,
        method: 'PATCH',
        status: 200,
        response: {
          user,
        },
        delay: 1000,
      },
    ],
  },
};

export default meta;
type Story = StoryObj<NexaNodeAdminAuthActivateComponent>;

export const Primary: Story = {
  args: {
    id: user.id,
    token: user.accessToken,
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/activate works!/gi)).toBeTruthy();
  },
};
