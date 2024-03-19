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

@ValidatorConstraint({ name: 'userPasswordLoginValid', async: true })
@Injectable()
export class UserPasswordLoginValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const usernameValue = (validationArguments.object as any)['username'];
    if (!usernameValue) return false;
    return await firstValueFrom(
      from(
        this.prisma.user.findFirst({
          where: {
            OR: [
              {
                email: String(usernameValue).toLowerCase(),
              },
              {
                phone: String(usernameValue).toLowerCase(),
              },
            ],
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

export function UserPasswordLoginValid(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'UserPasswordLoginValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserPasswordLoginValidConstraint,
    });
  };
}
