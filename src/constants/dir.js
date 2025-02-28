import path from 'node:path';

export const tempUploadDir = path.join(process.cwd(), 'temp');

export const uploadDir = path.join(process.cwd(), 'upload');

export const templatesDir = path.join(process.cwd(), 'src', 'templates');
