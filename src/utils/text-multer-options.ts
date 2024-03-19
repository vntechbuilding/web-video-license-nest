import { diskStorage } from 'multer';
import { tmpFolder } from '../constants';
import { editFileName } from './multer-options';

export const textFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(txt)$/)) {
    return cb(new Error('Only text files are allowed!'), false);
  }
  const allowedMimeTypes = ['text/plain'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Only text files are allowed!'), false);
  }
  cb(null, true);
};
export const TextMulterOptions = () => {
  return {
    storage: diskStorage({
      destination: tmpFolder,
      filename: editFileName,
    }),
    fileFilter: textFileFilter,
  };
};
