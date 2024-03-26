import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@ValidatorConstraint({ name: 'PageDomainIdValid', async: true })
@Injectable()
export class PageDomainIdValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}

  async validate(pageId: string, validatorArguments?: ValidationArguments) {
    const domainId = (validatorArguments.object as any)['domainId'];
    if (!pageId || !domainId) return false;
    const page = await this.prisma.page.findUnique({
      where: {
        id: pageId,
        domainId: domainId,
      },
    });
    return !!page;
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return (validationArguments.object as any).message || 'Trang không hợp lệ';
  }
}
export function PageDomainIdValid(validationOptions?: ValidationOptions) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'PageDomainIdValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: PageDomainIdValidConstraint,
    });
  };
}
