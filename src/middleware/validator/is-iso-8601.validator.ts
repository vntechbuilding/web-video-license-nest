import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as moment from 'moment';
import { ISO_8601 } from 'moment';

@ValidatorConstraint({ name: 'IsIso8601', async: false })
export class IsIso8601Constraint implements ValidatorConstraintInterface {
  validate(value: string) {
    if (!value) return true;
    const momentTime = moment(value, ISO_8601);
    // console.log(value, momentTime, ISO_8601, momentTime.isValid());
    return momentTime.isValid();
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return (
      (validationArguments.object as any).message ||
      'Ngày tháng không đúng định dạng ISO 8601'
    );
  }
}
export function IsIso8601(validationOptions?: any) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'IsIso8601',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsIso8601Constraint,
    });
  };
}
