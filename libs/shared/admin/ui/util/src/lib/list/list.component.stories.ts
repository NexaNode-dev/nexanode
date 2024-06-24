import type { Meta, StoryObj } from '@storybook/angular';
import { NexaNodeAmdinUiListComponent } from './list.component';

import { within, expect, userEvent } from '@storybook/test';
import { IUser } from '@nexanode/domain-interfaces';
import { usersFactory } from '@nexanode/testing-data-mocks-utils';
import { faker } from '@faker-js/faker';

const userNumber = faker.number.int({ min: 1, max: 10 });
const users = usersFactory(userNumber, { userName: 'test' });
const columns = Object.keys(users[0]);

const meta: Meta<NexaNodeAmdinUiListComponent<IUser>> = {
  component: NexaNodeAmdinUiListComponent,
  title: 'NexaNodeAmdinUiListComponent',
  args: {
    type: 'user',
    data: users,
    columns: columns,
  },
};
export default meta;
type Story = StoryObj<NexaNodeAmdinUiListComponent<IUser>>;

export const Primary: Story = {};

export const SelectedRowClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rows = canvas.getAllByRole('row');
    const checkboxes = canvas.getAllByRole('checkbox');
    const firstRow = rows[1];
    await userEvent.click(firstRow);
    expect(checkboxes[1]).toHaveClass('mdc-checkbox--selected');
  },
};

export const SelectedRowCheckbox: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole('checkbox');
    const firstCheckbox = checkboxes[1];
    await userEvent.click(firstCheckbox);
    expect(checkboxes[1]).toHaveClass('mdc-checkbox--selected');
  },
};

export const SelectAllRows: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole('checkbox');
    const selectAllCheckbox = checkboxes[0];
    await userEvent.click(selectAllCheckbox);
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toHaveClass('mdc-checkbox--selected');
    });
  },
};

export const UnselectAllRows: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole('checkbox');
    const selectAllCheckbox = checkboxes[0];
    await userEvent.click(selectAllCheckbox);
    await userEvent.click(selectAllCheckbox);
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toHaveClass('mdc-checkbox--selected');
    });
  },
};

export const FilterRows: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const filterInput = canvas.getByRole('textbox');
    await userEvent.type(filterInput, 'test');
    const rows = canvas.getAllByRole('row');
    expect(rows).toHaveLength(userNumber + 1);
  },
};

export const AddNewRow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByRole('button', { name: 'Add' });
    await userEvent.click(addButton);
  },
};
