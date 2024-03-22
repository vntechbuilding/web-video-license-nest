import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ModelNameType, PrismaService } from '../prisma/prisma.service';
import { join } from 'path';
import {
  uploadContentImageDir,
  uploadContentImageThumbnailDir,
} from '../../utils/find-root-dir';
import { ToSlug } from '../../utils/to-slug';
import { RandStr } from '../../utils/rand-str';
import * as sharp from 'sharp';
import { unlinkSync } from 'fs';
import { Base64PngValid } from '../../utils/base64-png-valid';

@ValidatorConstraint({
  name: 'ContentImageValid',
  async: true,
})
@Injectable()
export class ContentImageValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}
  async validate(image: string, args: ValidationArguments) {
    if (!image) return true;
    const isValid = await Base64PngValid(image);
    if (!isValid.isValid) return false;
    const [model, idProperty] = args.constraints;
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
      if (prismaData.image) {
        removeFile = join(uploadContentImageDir, prismaData.image);
        removeThumbnailFile = join(
          uploadContentImageThumbnailDir,
          prismaData.image,
        );
      }
    }

    const title =
      (args.object as any)['title'] || (args.object as any)['metaTitle'];

    const fileName: string = ToSlug(title) + '-' + RandStr(5) + '.png';
    const filePath = join(uploadContentImageDir, fileName);
    const fileThumbnailPath = join(uploadContentImageThumbnailDir, fileName);
    await sharp(isValid.buffer)
      .resize(1360, 816, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255 },
      })
      .toFile(filePath);
    await sharp(isValid.buffer)
      .resize(453, 272, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255 },
      })
      .toFile(fileThumbnailPath);
    args.object['image'] = fileName;
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
      (validationArguments.object as any).message || 'Hình ảnh không hợp lệ'
    );
  }
}
export function ContentImageValid<T extends ModelNameType>(
  model: T,
  idProperty: string,
  validationOptions?: ValidationOptions,
) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'ContentImageValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, idProperty],
      validator: ContentImageValidConstraint,
    });
  };
}
