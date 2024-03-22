import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@ValidatorConstraint({ name: 'AuthorIdValid', async: true })
@Injectable()
export class AuthorIdValidConstraint implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}
  async validate(authorId: string, validationArguments?: ValidationArguments) {
    const userId = (validationArguments.object as any)['userId'];
    if (!userId) return false;
    if (!authorId) return true;
    const author = await this.prisma.author.findUnique({
      where: {
        id: authorId,
        userId: userId,
      },
    });
    if (!author) return false;
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return (
      (validationArguments.object as any).message || 'Tác giả không hợp lệ'
    );
  }
}
export function AuthorIdValid(validationOptions?: ValidationOptions) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'AuthorIdValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: AuthorIdValidConstraint,
    });
  };
}
