import path from 'node:path';
import fs from 'node:fs/promises';
import { tempUploadDir, uploadDir } from '../constants/dir.js';
import { env } from './env.js';

export const saveFileToUpload = async (file) => {
  await fs.rename(
    path.join(tempUploadDir, file.filename),
    path.join(uploadDir, file.filename),
  );
  return `${env('APP_DOMAIN')}/uploads/${file.filename}`;
};
