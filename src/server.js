import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import allRouters from './routers/allRouters.js';
import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { ctrlWrapper } from './utils/ctrlWrapper.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { uploadDir } from './constants/dir.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

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
  app.use(cookieParser());
  app.use('/uploads', express.static(uploadDir));
  app.use('/api-docs', swaggerDocs());
  app.use(allRouters);
  app.use('*', ctrlWrapper(notFoundHandler));
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
