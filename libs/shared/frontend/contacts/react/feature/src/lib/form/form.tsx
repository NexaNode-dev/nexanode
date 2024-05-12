import React, { useState } from 'react';
import styles from './form.module.css';
import { useContacts } from '@nexanode/frontend-contacts-react-data-access';
import { IContact } from '@nexanode/domain-interfaces';

/* eslint-disable-next-line */
export interface ContactFormProps {}

export const ContactForm: React.FC<ContactFormProps> = (props) => {
  const { createContact, isLoading } = useContacts();
  const [contact, setContact] = useState<Partial<IContact>>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createContact(contact);
  };
  return (
    <div className={styles.contactForm}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            value={contact.name}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            value={contact.email}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            onChange={handleChange}
            value={contact.message}
            rows={10}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting form...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
