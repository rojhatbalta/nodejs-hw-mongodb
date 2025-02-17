import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { ctrlWrapper } from './utils/ctrlWrapper.js';
import { errorHandler } from './middlewares/errorHandler.js';

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
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );
  app.use(contactsRouter);
  app.use('*', ctrlWrapper(notFoundHandler));
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
