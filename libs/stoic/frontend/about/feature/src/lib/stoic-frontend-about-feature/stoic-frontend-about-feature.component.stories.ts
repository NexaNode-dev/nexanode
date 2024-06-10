import type { Meta, StoryObj } from '@storybook/angular';
import { StoicFrontendAboutFeatureComponent } from './stoic-frontend-about-feature.component';

import { within, expect } from '@storybook/test';

const meta: Meta<StoicFrontendAboutFeatureComponent> = {
  component: StoicFrontendAboutFeatureComponent,
  title: 'StoicFrontendAboutFeatureComponent',
};
export default meta;
type Story = StoryObj<StoicFrontendAboutFeatureComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText(/stoic-frontend-about-feature works!/gi),
    ).toBeTruthy();
  },
};
