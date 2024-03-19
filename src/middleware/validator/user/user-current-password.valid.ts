import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { firstValueFrom, from, of, switchMap } from 'rxjs';
import { verify } from 'argon2';
import { invalidLogin } from '../../../utils/auth-utils/auth-utils';

@ValidatorConstraint({ name: 'UserCurrentPasswordValid', async: true })
@Injectable()
export class UserCurrentPasswordValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const memberID = (validationArguments.object as any)['id'];
    // console.log(validationArguments.object as any);
    // console.log(memberID);
    if (!memberID) return false;
    return await firstValueFrom(
      from(
        this.prisma.user.findUnique({
          where: {
            id: memberID,
          },
        }),
      ).pipe(
        switchMap((user) => {
          if (!user || user.disabled) return of(false);
          return verify(user.hash, value);
        }),
      ),
    );
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return (validationArguments.object as any).message || invalidLogin;
  }
}

export function UserCurrentPasswordValid(
  validationOptions?: ValidationOptions,
) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'UserCurrentPasswordValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserCurrentPasswordValidConstraint,
    });
  };
}
