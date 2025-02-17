import { getContactsById, getAllContacts } from '../services/contacts.js';

export const getSendAllContacts = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getSendContactById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await getContactsById(id);
  if (contact) {
    return res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data: contact,
    });
  }
  res.status(404).json({
    message: 'Contact not found',
  });
};
