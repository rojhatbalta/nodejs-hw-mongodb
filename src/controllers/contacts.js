import createHttpError from 'http-errors';
import {
  getContactsById,
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { paginationParse } from '../utils/paginationParse.js';
import { sortParse } from '../utils/sortParse.js';
import { filterParse } from '../utils/filterParse.js';

export const getSendAllContacts = async (req, res) => {
  const { page, perPage } = paginationParse(req.query);
  const { sortBy, sortOrder } = sortParse(req.query);
  const filter = filterParse(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  if (!contacts) {
    createHttpError(404, 'No contacts found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts.data,
      page: contacts.page,
      perpage: contacts.perPage,
      totalItems: contacts.totalItems,
      totalPages: contacts.totalPages,
      hasPrevioursPage: contacts.hasPreviousPage,
      hasNextPage: contacts.hasNextPage,
    },
  });
};

export const getSendContactById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactsById(id);
  if (!contact) {
    createHttpError(404, 'bulamadım baba');
  }
  return res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};

export const createSendContact = async (req, res, next) => {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateSendContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteSendContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};
