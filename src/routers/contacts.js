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
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const routerContacts = Router();
routerContacts.use(authenticate);
routerContacts.get('/', ctrlWrapper(getSendAllContacts));
routerContacts.get('/:contactId', isValidId, ctrlWrapper(getSendContactById));
routerContacts.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateSendContact),
);
routerContacts.delete('/:contactId', isValidId, ctrlWrapper(deleteSendContact));
routerContacts.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createSendContact),
);

export default routerContacts;
