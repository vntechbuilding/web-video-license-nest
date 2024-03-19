import { readFileSync, readdirSync } from 'fs';
import { extname, join } from 'path';

export const readFilesInDirectory = (
  directory: string,
  ext: string = '.json',
): string[] => {
  const files = readdirSync(directory);
  const jsonFiles = files.filter((file) => extname(file) === ext);
  const filesArray = [];
  jsonFiles.forEach((file) => {
    const filePath = join(directory, file);
    const data = readFileSync(filePath, 'utf-8');
    filesArray.push(data);
  });
  return filesArray;
};
