import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as moment from 'moment';

@ValidatorConstraint({ name: 'IsIso8601Duration', async: false })
export class IsIso8601DurationConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string) {
    if (!value) return true;
    return moment.duration(value).isValid();
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return (
      (validationArguments.object as any).message ||
      'Thời lượng không đúng định dạng ISO 8601'
    );
  }
}

export function IsIso8601Duration(validationOptions?: any) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'IsIso8601Duration',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsIso8601DurationConstraint,
    });
  };
}
