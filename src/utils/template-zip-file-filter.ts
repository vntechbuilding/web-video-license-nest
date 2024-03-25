import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { multerGlobalOptions, templateTmpFolder } from '../constants';
import { diskStorage } from 'multer';
import { editFileName } from './multer-options';
import { BadRequestException } from '@nestjs/common';

export const TemplateZipFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (...args: any[]) => void,
) => {
  // console.log('TemplateZipFileFilter file', file);
  if (!file.originalname.match(/\.(zip)$/)) {
    return cb(
      new BadRequestException([
        {
          property: 'file',
          errors: 'Only zip files are allowed!',
          code: 'zipFilter',
          message: 'Only zip files are allowed!',
        },
      ]),
      false,
    );
    // return cb(new Error('Only zip files are allowed!'), false);
  }
  const allowedMimeTypes = ['application/zip', 'application/x-zip-compressed']; //application/x-zip-compressed

  if (!allowedMimeTypes.includes(file.mimetype)) {
    // return cb(new Error('Only zip files are allowed!'), false);
    return cb(
      new BadRequestException([
        {
          property: 'file',
          errors: 'Only zip files are allowed!',
          code: 'zipFilter',
          message: 'Only zip files are allowed!',
        },
      ]),
      false,
    );
  }
  cb(null, true);
};

export const TemplateZipMulterOptions = (): MulterOptions => {
  return {
    ...multerGlobalOptions,
    storage: diskStorage({
      destination: templateTmpFolder,
      filename: editFileName,
    }),
    fileFilter: TemplateZipFileFilter,
  };
};
