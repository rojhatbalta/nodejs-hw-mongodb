import { initMongoDB } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { dirNotexists } from './utils/dirNotExists.js';
import { tempUploadDir, uploadDir } from './constants/dir.js';

const bootstrap = async () => {
  await initMongoDB();
  await dirNotexists(tempUploadDir);
  await dirNotexists(uploadDir);
  setupServer();
};

bootstrap();
