import { existsSync } from 'fs';
import { join, dirname } from 'path';

export function findRootDir(currentDir: string = __dirname): string {
  if (existsSync(join(currentDir, 'package.json'))) {
    return currentDir;
  }

  const parentDir = dirname(currentDir);

  if (parentDir === currentDir) {
    throw new Error('Root directory with package.json not found');
  }

  return findRootDir(parentDir);
}

export const uploadImageDir = join(findRootDir(), 'assets', 'images');
export const ckeditorUploadDir = join(uploadImageDir, 'uploads');
export const ckeditorUploadUrl = '/images/uploads/';
// 1200  x 675
export const uploadMetaImageDir = join(uploadImageDir, '16x9');
export const updateAutoImageDir = join(uploadImageDir, 'auto');
export const updateTemplateImageDir = join(uploadImageDir, 'template');
export const defaultImageTemplateDir = '/images/template/';
export const uploadMetaImageThumbnailDir = join(
  uploadImageDir,
  '16x9',
  'thumbnail',
);
export const uploadMetaImageUrl = '/images/16x9/';
export const uploadMetaImageThumbnailUrl = '/images/16x9/thumbnail/';
export const uploadVideoUrl = '/videos/';

// 1360 * 816
export const uploadContentImageDir = join(uploadImageDir, '5x3');
export const uploadContentImageThumbnailDir = join(
  uploadImageDir,
  '5x3',
  'thumbnail',
);
