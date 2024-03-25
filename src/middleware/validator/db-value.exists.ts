import { Prisma } from '@prisma/client';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

@ValidatorConstraint({
  name: 'DBValueExists',
  async: true,
})
export class DBValueExistsConstraint implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  async validate(value: any, validationArguments: ValidationArguments) {
    if (!value) return true;
    const [model, propertyName] = validationArguments.constraints;
    // console.log('DBValueExistsConstraint', { model, propertyName, value });
    const checkModel = this.prisma[model] as any;
    try {
      if (checkModel) {
        const checkData = await checkModel.findUnique({
          where: {
            [propertyName]: value,
          },
        });
        if (!checkData) return false;
        return true;
      } else return false;
    } catch (e) {
      return false;
    }
    // const checkUser = await this.prisma.user-decorate.findUnique({
    //   where: {
    //     id: value,
    //   },
    // });
    // if (!checkUser) return false;
    // return true;
  }
  // defaultMessage(validationArguments?: ValidationArguments): string {
  //   return 'Dữ liệu đã tồn tại';
  // }
}

/*
VD kiểm tra xem model User có Id là admin hay không:
DBValueExists('user-decorate', username)
 */
// export function DBValueExists(
//   model: string,
//   dataPropertyName: string,
//   validationOptions?: ValidationOptions,
// ) {
//   return (object: any, propertyName: string) => {
//     registerDecorator({
//       name: 'DBValueExists',
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [model, dataPropertyName],
//       validator: DBValueExistsConstraint,
//     });
//   };
// }
export type DBModelName = Uncapitalize<
  (typeof Prisma.ModelName)[keyof (typeof Prisma)['ModelName']]
>;
export type DBPropertyNameUnique<T extends DBModelName> =
  `${Capitalize<T>}ScalarFieldEnum`;
export type DBPropertyName<T extends DBModelName> =
  keyof (typeof Prisma)[DBPropertyNameUnique<T>];
export function DBValueExists<T extends DBModelName>(
  model: T,
  dataPropertyName: DBPropertyName<T>,
  validationOptions?: ValidationOptions,
  allowNull = false,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'DBValueExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, dataPropertyName, allowNull],
      validator: DBValueExistsConstraint,
    });
  };
}
