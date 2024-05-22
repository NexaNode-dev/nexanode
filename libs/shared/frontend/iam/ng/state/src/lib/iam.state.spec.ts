import { authStore } from './iam.state';

describe('IamState', () => {
  it('should create an instance', () => {
    expect(new authStore()).toBeTruthy();
  });
});
