import { readdirSync, unlinkSync } from 'fs';
import { extname, join } from 'path';

export const deleteFilesInDirectory = (
  directory: string,
  ext: string = '.json',
): void => {
  const files = readdirSync(directory);
  const jsonFiles = files.filter((file) => extname(file) === ext);

  jsonFiles.forEach((file) => {
    const filePath = join(directory, file);
    try {
      unlinkSync(filePath);
    } catch (e) {}
  });
};
