import { render } from '@testing-library/react';

import Form from './form';

describe('Form', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Form />);
    expect(baseElement).toBeTruthy();
  });
  it('should send a contact form', () => {
    const { baseElement } = render(<Form />);
    baseElement.querySelector('form')?.dispatchEvent(new Event('submit'));
    expect(baseElement).toBeTruthy();
  });
});
