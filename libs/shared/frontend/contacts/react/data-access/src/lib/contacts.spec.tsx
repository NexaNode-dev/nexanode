import { renderHook, waitFor } from '@testing-library/react';

import useContacts from './contacts';
import { contactsFactory } from '@nexanode/testing-data-mocks-utils';

const contacts = contactsFactory();
describe('useContacts', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });
  it('should render successfully', async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(contacts),
        }) as any,
    );
    const { result } = renderHook(() => useContacts());

    expect(result.current.contacts).toStrictEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.selectedContact).toStrictEqual({});

    await waitFor(async () => {
      result.current.fetchContacts();
    });

    expect(result.current.contacts).toStrictEqual(contacts);
  });

  it('should fetch contact by id', async () => {
    const contact = contacts[0];
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(contact),
        }) as any,
    );
    const { result } = renderHook(() => useContacts());

    await waitFor(async () => {
      result.current.fetchContactById(contact.id);
    });

    expect(result.current.selectedContact).toStrictEqual(contact);
  });

  it('should create contact', async () => {
    const contact = contacts[0];
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(contact),
        }) as any,
    );
    const { result } = renderHook(() => useContacts());

    await waitFor(async () => {
      result.current.createContact(contact);
    });

    expect(result.current.contacts).toStrictEqual([contact]);
  });

  it('should handle error', async () => {
    const error = new Error('error');
    global.fetch = vi.fn(() => Promise.reject(error));
    const { result } = renderHook(() => useContacts());

    await waitFor(async () => {
      result.current.fetchContacts();
    });

    expect(result.current.error).toBe(error);
  });
});
