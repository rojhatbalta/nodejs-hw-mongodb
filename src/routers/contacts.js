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

const router = Router();
router.get('/contacts', ctrlWrapper(getSendAllContacts));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getSendContactById));
router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createSendContact),
);
router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateSendContact),
);
router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteSendContact),
);

export default router;
