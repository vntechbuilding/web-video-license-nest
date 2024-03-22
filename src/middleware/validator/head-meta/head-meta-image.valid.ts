import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ToSlug } from '../../../utils/to-slug';
import { RandStr } from '../../../utils/rand-str';
import { join } from 'path';
import {
  uploadMetaImageDir,
  uploadMetaImageThumbnailDir,
} from '../../../utils/find-root-dir';
import * as sharp from 'sharp';
import { ModelNameType, PrismaService } from '../../prisma/prisma.service';
import { unlinkSync } from 'fs';
import { Base64PngValid } from '../../../utils/base64-png-valid';

@ValidatorConstraint({ name: 'HeadMetaImageValid', async: true })
@Injectable()
export class HeadMetaImageValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}
  async validate(image: string, args: ValidationArguments) {
    if (!image) return true;
    const isValid = await Base64PngValid(image);
    if (!isValid.isValid) return false;
    const [model, idProperty, imageCol] = args.constraints;
    const idData = (args.object as any)[idProperty];
    let removeFile: any = false;
    let removeThumbnailFile: any = false;
    if (idData) {
      const checkModel = this.prisma[model] as any;
      const prismaData = await checkModel.findUnique({
        where: {
          id: idData,
        },
      });
      if (!prismaData) return false;
      if (prismaData[imageCol]) {
        removeFile = join(uploadMetaImageDir, prismaData[imageCol]);
        removeThumbnailFile = join(
          uploadMetaImageThumbnailDir,
          prismaData[imageCol],
        );
      }
    }

    const title =
      (args.object as any)['title'] ||
      (args.object as any)['metaTitle'] ||
      (args.object as any)['name'];

    const fileName: string = ToSlug(title) + '-' + RandStr(5) + '.png';
    const filePath = join(uploadMetaImageDir, fileName);
    const fileThumbnailPath = join(uploadMetaImageThumbnailDir, fileName);
    await sharp(isValid.buffer)
      .resize(1200, 675, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255 },
      })
      .toFile(filePath);
    await sharp(isValid.buffer)
      .resize(400, 225, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255 },
      })
      .toFile(fileThumbnailPath);
    args.object[imageCol] = fileName;
    if (idData && removeFile) {
      try {
        unlinkSync(removeFile);
        unlinkSync(removeThumbnailFile);
      } catch (e) {}
    }
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return (
      (validationArguments.object as any).message ||
      'Head meta image không hợp lệ'
    );
  }
}
export function HeadMetaImageValid<T extends ModelNameType>(
  model: T,
  idProperty: string,
  imageCol: string = 'metaImage',
  validationOptions?: ValidationOptions,
) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'HeadMetaImageValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, idProperty, imageCol],
      validator: HeadMetaImageValidConstraint,
    });
  };
}
