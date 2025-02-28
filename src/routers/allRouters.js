import { Router } from 'express';
import routerContacts from './contacts.js';
import routerAuth from './auth.js';

const allRouters = Router();
allRouters.use('/auth', routerAuth);
allRouters.use('/contacts', routerContacts);

export default allRouters;
