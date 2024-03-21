import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@ValidatorConstraint({ name: 'NewsCategoryParentIdValid', async: true })
@Injectable()
export class NewsCategoryParentIdValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}

  async validate(parentId: string, validationArguments?: ValidationArguments) {
    const domainId = (validationArguments.object as any)['domainId'];
    if (!domainId) return false;
    if (!parentId) return true;
    const parentCategory = await this.prisma.newsCategory.findUnique({
      where: {
        id: parentId,
        domainId: domainId,
      },
    });
    if (!parentCategory) return false;
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return (
      (validationArguments.object as any).message || 'Danh mục không hợp lệ'
    );
  }
}

export function NewsCategoryParentIdValid(
  validationOptions?: ValidationOptions,
) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'NewsCategoryParentIdValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: NewsCategoryParentIdValidConstraint,
    });
  };
}
