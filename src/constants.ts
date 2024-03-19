import { join } from 'path';
import { findRootDir } from './utils/find-root-dir';
export const rootDir = findRootDir();
export const profilesFolder = join(rootDir, 'profiles');
export const tmpFolder = join(rootDir, 'tmp');
