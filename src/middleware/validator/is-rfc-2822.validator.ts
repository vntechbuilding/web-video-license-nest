import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as moment from 'moment';
import { RFC_2822 } from 'moment';

@ValidatorConstraint({ name: 'IsRfc2822', async: false })
export class IsRfc2822Constraint implements ValidatorConstraintInterface {
  validate(value: string) {
    if (!value) return true;
    const momentTime = moment(value, RFC_2822);
    const isValid = momentTime.isValid();
    // console.log(value, momentTime, isValid, RFC_2822);
    return isValid;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return (
      (validationArguments.object as any).message ||
      'Ngày giờ không đúng định dạng RFC 2822'
    );
  }
}
export function IsRfc2822(validationOptions?: any) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'IsRfc2822',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsRfc2822Constraint,
    });
  };
}
