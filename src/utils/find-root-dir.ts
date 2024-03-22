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
// 1200  x 675
export const uploadMetaImageDir = join(uploadImageDir, '16x9');
export const uploadMetaImageThumbnailDir = join(
  uploadImageDir,
  '16x9',
  'thumbnail',
);

// 1360 * 816
export const uploadContentImageDir = join(uploadImageDir, '5x3');
export const uploadContentImageThumbnailDir = join(
  uploadImageDir,
  '5x3',
  'thumbnail',
);
