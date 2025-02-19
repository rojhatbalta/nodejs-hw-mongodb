import { Router } from 'express';
import {
  createSendContact,
  deleteSendContact,
  getSendAllContacts,
  getSendContactById,
  updateSendContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const routerContacts = Router();
routerContacts.get('/contacts', ctrlWrapper(getSendAllContacts));
routerContacts.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getSendContactById),
);
routerContacts.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createSendContact),
);
routerContacts.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateSendContact),
);
routerContacts.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteSendContact),
);

export default routerContacts;
