import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const tempUploadDir = path.join(__dirname, '..', 'temp');
export const uploadDir = path.join(__dirname, '..', 'upload');
export const templatesDir = path.join(__dirname, 'templates');
