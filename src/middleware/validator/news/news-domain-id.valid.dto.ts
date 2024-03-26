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
  name: 'NewsDomainIdValid',
  async: true,
})
@Injectable()
export class NewsDomainIdValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}

  async validate(newsId: string, validatorArguments?: ValidationArguments) {
    const domainId = (validatorArguments.object as any)['domainId'];
    if (!newsId || !domainId) return false;
    const news = await this.prisma.news.findUnique({
      where: {
        id: newsId,
        domainId: domainId,
      },
    });
    return !!news;
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return (
      (validationArguments.object as any).message || 'Tin tức không hợp lệ'
    );
  }
}

export function NewsDomainIdValid(validationOptions?: ValidationOptions) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'NewsDomainIdValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: NewsDomainIdValidConstraint,
    });
  };
}
