import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NgIconComponent } from '@ng-icons/core';
import { FooterComponent } from './footer.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<FooterComponent> = {
  component: FooterComponent,
  title: 'FooterComponent',
  decorators: [
    moduleMetadata({
      imports: [NgIconComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<FooterComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/footer works!/gi)).toBeTruthy();
  },
};
