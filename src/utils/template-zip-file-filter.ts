export const TemplateZipFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (...args: any[]) => void,
) => {
  // console.log('mp4FileFilter file', file);
  if (!file.originalname.match(/\.(zip)$/)) {
    return cb(new Error('Only zip files are allowed!'), false);
  }
  const allowedMimeTypes = ['application/zip'];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Only zip files are allowed!'), false);
  }
  cb(null, true);
};
