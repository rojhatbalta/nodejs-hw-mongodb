import { ContactsCollection } from '../db/models/contact.js';
import { pagination } from '../utils/pagination.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = 'asc',
  sortBy = 'name',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find();
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.contactType !== undefined) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();
  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .collation({ locale: 'tr', strength: 1 })
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = pagination(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactsById = async (contactID) => {
  const contact = await ContactsCollection.findById(contactID);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    {
      _id: contactId,
    },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};
