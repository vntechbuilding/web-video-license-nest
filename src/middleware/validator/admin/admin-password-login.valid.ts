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

@ValidatorConstraint({ name: 'adminPasswordLoginValid', async: true })
@Injectable()
export class AdminPasswordLoginValidConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const usernameValue = (validationArguments.object as any)['username'];
    if (!usernameValue) return firstValueFrom(of(false));
    return await firstValueFrom(
      from(
        this.prisma.admin.findUnique({
          where: {
            username: usernameValue,
          },
        }),
      ).pipe(
        switchMap((admin) => {
          if (!admin || admin.disabled) return of(false);
          return verify(admin.hash, value);
        }),
      ),
    );
  }

  defaultMessage(): string {
    return invalidLogin;
  }
}

export function AdminPasswordLoginValid(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'AdminPasswordLoginValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: AdminPasswordLoginValidConstraint,
    });
  };
}
