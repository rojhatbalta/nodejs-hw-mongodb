import { Router } from 'express';
import {
  createSendContact,
  deleteSendContact,
  getSendAllContacts,
  getSendContactById,
  updateSendContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get('/contacts', ctrlWrapper(getSendAllContacts));
router.get('/contacts/:contactId', ctrlWrapper(getSendContactById));
router.post('/contacts', ctrlWrapper(createSendContact));
router.patch('/contacts/:contactId', ctrlWrapper(updateSendContact));
router.delete('/contacts/:contactId', ctrlWrapper(deleteSendContact));

export default router;
