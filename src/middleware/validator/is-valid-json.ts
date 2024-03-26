import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsValidJSONConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value === 'string') {
      try {
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    }
    // Check if value is an object
    return value && typeof value === 'object' && value.constructor === Object;
  }
  defaultMessage(validationArguments?: ValidationArguments) {
    return (
      (validationArguments.object as any).message ||
      'Dữ liệu phải là một chuỗi JSON hợp lệ'
    );
  }
}

export function IsValidJSON(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidJSONConstraint,
    });
  };
}
