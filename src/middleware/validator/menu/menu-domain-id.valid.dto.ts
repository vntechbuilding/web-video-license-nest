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
  name: 'MenuDomainIdValid',
  async: true,
})
@Injectable()
export class MenuDomainIdValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}

  async validate(menuId: string, validatorArguments?: ValidationArguments) {
    const domainId = (validatorArguments.object as any)['domainId'];
    if (!menuId || !domainId) return false;
    const menu = await this.prisma.menu.findUnique({
      where: {
        id: menuId,
        domainId: domainId,
      },
    });
    return !!menu;
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return (
      (validationArguments.object as any).message || 'Tin tức không hợp lệ'
    );
  }
}

export function MenuDomainIdValid(validationOptions?: ValidationOptions) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'MenuDomainIdValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: MenuDomainIdValidConstraint,
    });
  };
}
