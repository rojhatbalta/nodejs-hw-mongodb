import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  try {
    const contacts = await ContactsCollection.find();
    return contacts;
  } catch (e) {
    console.error('Error fetching contacts: ', e);
  }
};

export const getContactsById = async (contactID) => {
  try {
    const contact = await ContactsCollection.findById(contactID);
    return contact;
  } catch (e) {
    console.error('Error fetching contact by id: ', e);
  }
};
