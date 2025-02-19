import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';

export const allRouters = Router();
allRouters.use('/auth', authRouter);
allRouters.use('/contacts', contactsRouter);
