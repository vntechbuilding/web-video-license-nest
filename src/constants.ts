import { join } from 'path';
import { findRootDir } from './utils/find-root-dir';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
export const rootDir = findRootDir();
export const profilesFolder = join(rootDir, 'profiles');
export const tmpFolder = join(rootDir, 'tmp');
export const assetsDir = join(rootDir, 'assets');
export const templateAssetsDir = join(assetsDir, 'templates');
export const templateTmpFolder = join(rootDir, 'tmp-template');
export const templateFolder = join(rootDir, 'templates');
export const tmpVideoFolder = join(rootDir, 'tmp-video');
export const videoFolder = join(rootDir, 'assets/videos');
export const multerGlobalOptions: MulterOptions = {
  limits: {
    fileSize: 10 * 1024 * 1024 * 1024, // 10GB
    fieldSize: 10 * 1024 * 1024 * 1024, // 10GB
  },
};
