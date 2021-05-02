import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

const tmpsFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpsFolder,
  storage: multer.diskStorage({
    destination: tmpsFolder,
    filename: (req, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
