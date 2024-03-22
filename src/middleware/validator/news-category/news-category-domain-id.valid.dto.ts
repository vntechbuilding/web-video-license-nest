import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@ValidatorConstraint({
  name: 'NewsCategoryDomainIdValid',
  async: true,
})
@Injectable()
export class NewsCategoryDomainIdValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}

  async validate(
    categoryId: string,
    validationArguments?: ValidationArguments,
  ) {
    const domainId = (validationArguments.object as any)['domainId'];
    if (!categoryId || !domainId) return false;
    const category = await this.prisma.newsCategory.findUnique({
      where: {
        id: categoryId,
        domainId: domainId,
      },
    });
    return !!category;
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return (
      (validationArguments.object as any).message || 'Danh mục không hợp lệ'
    );
  }
}

/**
 * Kiểm tra đồng thời categoryId và domainId có hợp lệ hay không
 * Kiểm tra tại trường categoryId
 * @param validationOptions
 * @constructor
 */
export function NewsCategoryDomainIdValid(
  validationOptions?: ValidationOptions,
) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'NewsCategoryDomainIdValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: NewsCategoryDomainIdValidConstraint,
    });
  };
}
