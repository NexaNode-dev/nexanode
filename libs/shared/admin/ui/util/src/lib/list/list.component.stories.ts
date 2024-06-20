import type { Meta, StoryObj } from '@storybook/angular';
import { NexaNodeAmdinUiListComponent } from './list.component';

import { within, expect } from '@storybook/test';
import { IUser } from '@nexanode/domain-interfaces';
import { usersFactory } from '@nexanode/testing-data-mocks-utils';

const users = usersFactory();

const meta: Meta<NexaNodeAmdinUiListComponent<IUser>> = {
  component: NexaNodeAmdinUiListComponent,
  title: 'NexaNodeAmdinUiListComponent',
};
export default meta;
type Story = StoryObj<NexaNodeAmdinUiListComponent<IUser>>;

export const Primary: Story = {
  args: {
    type: 'user',
    data: users,
  },
};
