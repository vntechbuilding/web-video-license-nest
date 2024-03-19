import { readdirSync } from 'fs';
import { extname } from 'path';

export const countFilesInDirectory = (
  directory: string,
  ext: string = '.json',
): number => {
  const files = readdirSync(directory);
  if (!ext) return files.length;
  const jsonFiles = files.filter((file) => extname(file) === ext);
  return jsonFiles.length;
};

// const profilesDirectory = join(findRootDir(), 'profiles');
// const jsonFileCount = countJsonFilesInDirectory(profilesDirectory);
//
// console.log(`There are ${jsonFileCount} .json files in the profiles directory.`);
