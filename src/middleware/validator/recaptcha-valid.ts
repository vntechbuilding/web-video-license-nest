import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@ValidatorConstraint({ name: 'recaptchaValid', async: true })
@Injectable()
export class RecaptchaValidConstraint implements ValidatorConstraintInterface {
  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  async validate(value: string) {
    // console.log({
    //   secret: this.config.get('RECAPTCHA_SECRET_KEY'),
    //   response: value,
    // });
    return await firstValueFrom(
      this.http
        .post('https://www.google.com/recaptcha/api/siteverify', null, {
          params: {
            secret: this.config.get('RECAPTCHA_SECRET_KEY'),
            response: value,
          },
        })
        .pipe(
          map((res) => {
            // console.log(res);
            if (res && res.data && res.data.success) return true;
            return false;
          }),
        ),
    );
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return (
      (validationArguments.object as any).message ||
      'Xác thực người dùng thất bại'
    );
  }
}

export function RecaptchaValid(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'RecaptchaValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: RecaptchaValidConstraint,
    });
  };
}
