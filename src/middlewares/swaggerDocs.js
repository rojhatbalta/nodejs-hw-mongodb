import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import { swaggerPath } from '../constants/swagger.js';

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(swaggerPath).toString);
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (error) {
    console.log('Error while reading swagger.json', error);
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
