import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { dirname, join } from 'path';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { faviconsFolder } from '../../constants';
import { mkdir } from 'fs/promises';
import { Base64PngValid } from '../../utils/base64-png-valid';
import favicons from 'favicons';
import { writeFileSync } from 'fs';

@ValidatorConstraint({ name: 'DomainFaviconsValid', async: true })
@Injectable()
export class DomainFaviconsValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}
  async validate(image: string, validationArguments?: ValidationArguments) {
    if (!image) return true;
    const { domainId } = validationArguments.object as any;
    const isValid = await Base64PngValid(image);
    if (!isValid.isValid) return false;
    if (!domainId) return false;
    const domain = await this.prisma.domain.findUnique({
      where: {
        id: domainId,
      },
    });
    if (!domain) return false;
    const domainFaviconsFolder = join(faviconsFolder, domainId);
    await mkdir(domainFaviconsFolder, { recursive: true });
    try {
      const faviconsResponse = await favicons(isValid.buffer, {
        path: '/favicons/' + domainId + '/',
      });
      // Lưu tất cả các hình ảnh favicon
      faviconsResponse.images.forEach((image) => {
        const outputPath = join(domainFaviconsFolder, image.name);
        writeFileSync(outputPath, image.contents);
      });
      // Lưu tất cả các file HTML liên quan
      faviconsResponse.files.forEach((file) => {
        const outputPath = join(domainFaviconsFolder, file.name);
        writeFileSync(outputPath, file.contents);
      });
      console.log(faviconsResponse.html);
      validationArguments.object['favicon'] = faviconsResponse.html.join('\n');
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  defaultMessage(validationArguments?: ValidationArguments) {
    return (
      (validationArguments.object as any).message ||
      'Favicon image không hợp lệ'
    );
  }
}
export function DomainFaviconsValid(validationOptions?: ValidationOptions) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'DomainFaviconsValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: DomainFaviconsValidConstraint,
    });
  };
}
