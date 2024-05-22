import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { RegisterComponent } from './register.component';

import { within, expect, userEvent } from '@storybook/test';

import { provideHttpClient } from '@angular/common/http';
import { userFactory } from '@nexanode/testing-data-mocks-utils';
import { ReactiveFormsModule } from '@angular/forms';

const meta: Meta<RegisterComponent> = {
  component: RegisterComponent,
  title: 'RegisterComponent',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  parameters: {
    cssprops: {
      'primary-light': {
        control: 'color',
      },
      primary: {
        control: 'color',
      },
      'primary-dark': {
        control: 'color',
      },
      'secondary-light': {
        control: 'color',
      },
      secondary: {
        control: 'color',
      },
      'secondary-dark': {
        control: 'color',
      },
      'tertiary-light': {
        control: 'color',
      },
      tertiary: {
        control: 'color',
      },
      'tertiary-dark': {
        control: 'color',
      },
      'neutral-light': {
        control: 'color',
      },
      neutral: {
        control: 'color',
      },
      'neutral-dark': {
        control: 'color',
      },
    },
    mockData: [
      {
        url: '/api/auth/register',
        method: 'POST',
        status: 201,
        response: userFactory(),
      },
    ],
  },
};
export default meta;
type Story = StoryObj<RegisterComponent>;

export const Primary: Story = {
  args: {},
};

export const CustomTitle: Story = {
  args: {
    title: 'Create an account',
  },
};

export const ValidateEmailRequired: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    step('Leave the email field empty', async () => {
      const email = canvas.getByLabelText('Email');
      await email.focus();
      await email.blur();
    });
    expect(await canvas.findByText('Email is required')).toBeInTheDocument();
  },
};

export const ValidateEmail: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    step('Input an invalid email', async () => {
      const email = canvas.getByLabelText('Email');
      userEvent.type(email, 'invalid-email');
      await email.blur();
    });
    expect(await canvas.findByText('Email is invalid')).toBeInTheDocument();
  },
};

export const ValidatePassword: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    step('Leave the password field empty', async () => {
      const password = canvas.getByLabelText('Password');
      await password.focus();
      await password.blur();
    });
    expect(await canvas.findByText('Password is required')).toBeInTheDocument();
  },
};

export const ValidateConfirmPassword: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    step('Leave the password field empty', async () => {
      const confirmPw = canvas.getByLabelText('Confirm Password');
      await confirmPw.focus();
      await confirmPw.blur();
    });
    expect(await canvas.findByText('Confirm Password is required')).toBeInTheDocument();
  },
};

export const ValidatePasswordMatch: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    step('Input different passwords', async () => {
      const password = canvas.getByLabelText('Password', { exact: true });
      await userEvent.type(password, 'password');
      const confirmPw = canvas.getByLabelText('Confirm Password');
      await userEvent.type(confirmPw, 'different-password');
      await confirmPw.blur();
    });
    expect(await canvas.findByText('Passwords do not match')).toBeInTheDocument();
  },
};

export const RegisterFlow: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Fill the email field', async () => {
      const email = canvas.getByLabelText('Email');
      await userEvent.type(email, 'test@example.com');
    });
    await step('Fill the password field', async () => {
      const password = canvas.getByLabelText('Password');
      await userEvent.type(password, 'password');
    });
    await step('Fill the confirm password field', async () => {
      const confirmPw = canvas.getByLabelText('Confirm Password');
      await userEvent.type(confirmPw, 'password');
    });
    await step('Submit the form', async () => {
      const submit = canvas.getByRole('button');
      await userEvent.click(submit);
    });
    expect(await canvas.findByText('You have successfully registered.')).toBeInTheDocument();
  }
};
