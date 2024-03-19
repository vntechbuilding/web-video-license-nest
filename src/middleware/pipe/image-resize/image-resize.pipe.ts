import { Injectable, PipeTransform } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as sharp from 'sharp';

@Injectable()
export class ImageResizePipe implements PipeTransform {
  // transform(value: any, metadata: ArgumentMetadata) {
  //   return value;
  // }
  async transform(file: Express.Multer.File) {
    //, metadata: ArgumentMetadata
    // console.log(file);
    const buffer = readFileSync(file.path);
    // const newFile = { ...file };
    await sharp(buffer)
      .resize(200, 200, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255 },
      })
      .toFile(file.path);
    return file.filename;
  }
}
