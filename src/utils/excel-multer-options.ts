import { diskStorage } from 'multer';
import { tmpFolder } from '../constants';
import { editFileName } from './multer-options';

export const excelFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(xls|xlsx)$/)) {
    return callback(new Error('Only excel files are allowed!'), false);
  }
  const allowedMimeTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(new Error('Only excel files are allowed!'), false);
  }
  callback(null, true);
};
export const ExcelMulterOptions = () => {
  return {
    storage: diskStorage({
      destination: tmpFolder,
      filename: editFileName,
    }),
    fileFilter: excelFileFilter,
  };
};
