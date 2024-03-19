import { diskStorage } from 'multer';
import { tmpFolder } from '../constants';
import { editFileName } from './multer-options';

export const zipFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(zip)$/)) {
    return callback(new Error('Only zip files are allowed!'), false);
  }
  callback(null, true);
};

export const ProfileZipMulterOptions = () => {
  return {
    storage: diskStorage({
      destination: tmpFolder,
      filename: editFileName,
    }),
    fileFilter: zipFileFilter,
  };
};
