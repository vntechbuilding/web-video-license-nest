import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { TransformHtmlSanitize } from '../../../utils/transforms/transform-html-sanitize';

@ValidatorConstraint({ name: 'TransformHtml', async: true })
export class TransformHtmlConstraint implements ValidatorConstraintInterface {
  async validate(value: string, validatorArguments?: ValidationArguments) {
    if (!value) return true;
    const uploadDate =
      (validatorArguments.object as any)['uploadDate'] || new Date().toString();
    const newModifiedTime = new Date(
      new Date(uploadDate).getTime() -
        Math.floor(Math.random() * 60 * 60 * 24 * 10 * 1000),
    );
    // console.log(newModifiedTime);
    const [contentField] = validatorArguments.constraints;
    (validatorArguments.object as any)[contentField] =
      await TransformHtmlSanitize(value, newModifiedTime);
    return true;
  }
  defaultMessage() {
    return 'TransformHtml failed';
  }
}
export function TransformHtml(
  contentField: string = 'content',
  validationOptions?: ValidationOptions,
) {
  return (object: NonNullable<unknown>, propertyName: string) => {
    registerDecorator({
      name: 'TransformHtml',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [contentField],
      validator: TransformHtmlConstraint,
    });
  };
}
