import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ToSlug } from '../../../utils/to-slug';
import { RandStr } from '../../../utils/rand-str';
import { join } from 'path';
import { updateTemplateImageDir } from '../../../utils/find-root-dir';
import * as sharp from 'sharp';
import { Base64PngValid } from '../../../utils/base64-png-valid';
import { unlinkSync } from 'fs';
import { dataType } from '@prisma/client';
import { utimes } from 'fs/promises';

@ValidatorConstraint({ name: 'DomainTemplateImageValid', async: true })
@Injectable()
export class DomainTemplateImageValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}
  async validate(image: string, validatorArguments?: ValidationArguments) {
    if (!image) return false;
    const { domainId, templateType, code } = validatorArguments.object as any;
    const domain = await this.prisma.domain.findUnique({
      where: {
        id: domainId,
      },
    });
    if (!domain) return false;
    const templateData = await this.prisma.templateData.findUnique({
      where: {
        templateId_templateType_code: {
          templateId: domain.templateId,
          templateType: templateType,
          code: code,
        },
        dataType: 'IMAGE',
      },
    });
    if (!templateData) return false;
    const config = templateData.config as { width: number; height: number };
    if (
      !config ||
      typeof config !== 'object' ||
      !config.width ||
      !config.height
    )
      return false;
    const title = templateData.name;
    const fileName: string = ToSlug(title) + '-' + RandStr(7) + '.png';
    const filePath = join(updateTemplateImageDir, fileName);
    const isValid = await Base64PngValid(image);
    if (!isValid.isValid) return false;
    await sharp(isValid.buffer)
      .resize(config.width, config.height, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255 },
      })
      .toFile(filePath);

    const uploadDate =
      (validatorArguments.object as any)['uploadDate'] || new Date().toString();
    const newModifiedTime = new Date(
      new Date(uploadDate).getTime() -
        Math.floor(Math.random() * 60 * 60 * 24 * 10 * 1000),
    );
    // console.log(newModifiedTime);
    await utimes(filePath, newModifiedTime, newModifiedTime);

    const oldData = await this.prisma.domainTemplate.findUnique({
      where: {
        domainId_templateType_code: {
          domainId: domainId,
          templateType: templateType,
          code: code,
        },
      },
    });
    if (oldData && oldData.content) {
      const removePath = join(updateTemplateImageDir, oldData.content);
      try {
        unlinkSync(removePath);
      } catch (e) {}
    }
    validatorArguments.object['content'] = fileName;
    return true;
  }
  defaultMessage(validationArguments?: ValidationArguments) {
    return (validationArguments.object as any).message || 'Image không hợp lệ';
  }
}
export function DomainTemplateImageValid(
  validationOptions?: ValidationOptions,
) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'DomainTemplateImageValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: DomainTemplateImageValidConstraint,
    });
  };
}
