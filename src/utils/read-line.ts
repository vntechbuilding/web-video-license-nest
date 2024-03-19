import { PassThrough } from 'stream';
import { createReadStream } from 'fs';
import { createInterface } from 'readline/promises';
import { Subject } from 'rxjs';

export const readLines = (filePath: string) => {
  const input = createReadStream(filePath);
  const output = new PassThrough({ objectMode: true });
  const rl = createInterface({ input });
  rl.on('line', (line) => {
    // console.log(line);
    output.write(line);
  });
  rl.on('close', () => {
    // console.log('close');
    output.push(null);
  });
  return output;
};

export const readAllLines = async (filePath: string) => {
  const lines: Array<string> = [];
  for await (const line of readLines(filePath)) {
    lines.push(line);
  }
  return lines;
};

export const readLinesRxjs = (filePath: string) => {
  const input = createReadStream(filePath);
  const output = new Subject();
  const rl = createInterface({ input });
  rl.on('line', (line) => {
    // console.log(line);
    output.next(line);
  });
  rl.on('close', () => {
    // console.log('close');
    output.complete();
  });
  return output;
};
