import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@ValidatorConstraint({ name: 'PublisherIdValid', async: true })
@Injectable()
export class PublisherIdValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}
  async validate(
    publisherId: string,
    validationArguments?: ValidationArguments,
  ) {
    const userId = (validationArguments.object as any)['userId'];
    if (!userId) return false;
    if (!publisherId) return true;
    const publisher = await this.prisma.publisher.findUnique({
      where: {
        id: publisherId,
        userId: userId,
      },
    });
    if (!publisher) return false;
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return (
      (validationArguments.object as any).message || 'Publisher không hợp lệ'
    );
  }
}
export function PublisherIdValid(validationOptions?: ValidationOptions) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'PublisherIdValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: PublisherIdValidConstraint,
    });
  };
}
