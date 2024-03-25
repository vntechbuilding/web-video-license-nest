import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Base64PngValid } from '../../utils/base64-png-valid';
import { join } from 'path';
import { ModelNameType, PrismaService } from '../prisma/prisma.service';
import { ToSlug } from '../../utils/to-slug';
import { RandStr } from '../../utils/rand-str';
import * as sharp from 'sharp';
import { unlinkSync } from 'fs';
import { updateAutoImageDir } from '../../utils/find-root-dir';

@ValidatorConstraint({ name: 'ImageAutoValid', async: true })
export class ImageAutoValidConstraint implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}
  async validate(image: string, args: ValidationArguments) {
    const [model, idProperty, imageCol] = args.constraints;
    // console.log(model, idProperty, imageCol, args.object);
    if (!image) {
      delete (args.object as any)[imageCol];
      return true;
    }
    const isValid = await Base64PngValid(image);
    if (!isValid.isValid) return false;
    const idData = (args.object as any)[idProperty];
    let removeFile: any = false;
    if (idData) {
      const checkModel = this.prisma[model] as any;
      const prismaData = await checkModel.findUnique({
        where: {
          id: idData,
        },
      });
      if (!prismaData) return false;
      if (prismaData[imageCol]) {
        removeFile = join(updateAutoImageDir, prismaData[imageCol]);
      }
    }

    const title =
      (args.object as any)['title'] ||
      (args.object as any)['metaTitle'] ||
      (args.object as any)['name'];

    const fileName: string = ToSlug(title) + '-' + RandStr(5) + '.png';
    const filePath = join(updateAutoImageDir, fileName);
    await sharp(isValid.buffer)
      .resize(1200, null, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255 },
      })
      .toFile(filePath);

    args.object[imageCol] = fileName;
    if (idData && removeFile) {
      try {
        unlinkSync(removeFile);
      } catch (e) {}
    }
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return (validationArguments.object as any).message || 'Image không hợp lệ';
  }
}

export function ImageAutoValid<T extends ModelNameType>(
  model: T,
  idProperty: string,
  imageCol: string = 'image',
  validationOptions?: ValidationOptions,
) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'ImageAutoValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, idProperty, imageCol],
      validator: ImageAutoValidConstraint,
    });
  };
}
