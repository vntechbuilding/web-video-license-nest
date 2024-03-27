import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { multerGlobalOptions } from '../constants';
import { diskStorage } from 'multer';
import { editFileName } from './multer-options';
import { ckeditorUploadDir } from './find-root-dir';

export const ImageFileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error, status: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  const allowedMimeTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

export const ImageMulterOptions = (): MulterOptions => {
  return {
    ...multerGlobalOptions,
    storage: diskStorage({
      destination: ckeditorUploadDir,
      filename: editFileName,
    }),
    fileFilter: ImageFileFilter,
  };
};
