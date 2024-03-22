import { editFileName } from './multer-options';
import { diskStorage } from 'multer';
import { multerGlobalOptions, videoFolder } from '../constants';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const mp4FileFilter = (req, file, cb) => {
  // console.log('mp4FileFilter file', file);
  if (!file.originalname.match(/\.(mp4)$/)) {
    return cb(new Error('Only mp4 files are allowed!'), false);
  }
  const allowedMimeTypes = ['video/mp4'];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Only mp4 files are allowed!'), false);
  }
  cb(null, true);
};
export const Mp4MulterOptions = (): MulterOptions => {
  return {
    ...multerGlobalOptions,
    storage: diskStorage({
      destination: videoFolder,
      filename: editFileName,
    }),
    fileFilter: mp4FileFilter,
  };
};
