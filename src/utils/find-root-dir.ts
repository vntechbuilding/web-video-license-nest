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
