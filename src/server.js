import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import {
  getSendAllContacts,
  getSendContactById,
} from './controllers/contactControllers.js';

const PORT = Number(env('PORT', 3000));

const app = express();
export const setupServer = () => {
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());
  app.get('/contacts', getSendAllContacts);
  app.get('/contacts/:contactId', getSendContactById);

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
