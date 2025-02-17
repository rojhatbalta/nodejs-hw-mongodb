import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  try {
    const contacts = await ContactsCollection.find();
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts: ', error);
  }
};

export const getContactsById = async (contactID) => {
  try {
    const contact = await ContactsCollection.findById(contactID);
    return contact;
  } catch (error) {
    console.error('Error fetching contact by id: ', error);
  }
};
