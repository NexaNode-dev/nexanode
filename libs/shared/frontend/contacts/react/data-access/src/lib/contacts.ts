import { useState, useCallback } from 'react';
import { IContact } from '@nexanode/domain-interfaces';

export interface UseContacts {
  contacts: IContact[];
  selectedContact: IContact;
  error: unknown | null;
  isLoading: boolean;
  fetchContacts: () => Promise<void>;
  fetchContactById: (id: string) => Promise<void>;
  createContact: (contact: Partial<IContact>) => Promise<void>;
}

export function useContacts(): UseContacts {
  const [contacts, setContacts] = useState([] as IContact[]);
  const [selectedContact, setSelectedContact] = useState({} as IContact);
  const [error, setError] = useState(null as unknown);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchContactById = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const contact = contacts.find((c) => c.id === id);
      if (contact) {
        setSelectedContact(contact);
        return;
      }
      const response = await fetch(`/api/contacts/${id}`);
      const data = await response.json();
      setSelectedContact(data);
      setContacts([...contacts, data]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createContact = useCallback(async (contact: Partial<IContact>) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });
      const data = await response.json();
      setContacts([...contacts, data]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    contacts,
    selectedContact,
    error,
    isLoading,
    fetchContacts,
    fetchContactById,
    createContact,
  };
}

export default useContacts;
