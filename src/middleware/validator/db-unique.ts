import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

@ValidatorConstraint({
  name: 'DBUnique',
  async: true,
})
export class DBUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  async validate(value: any, validationArguments: ValidationArguments) {
    if (!value) return false;
    const [model, propertyName, idData, isNew] =
      validationArguments.constraints;
    // console.log('DBUniqueConstraint', { model, propertyName, idData, isNew });
    const checkModel = this.prisma[model] as any;
    if (checkModel) {
      // if (!isNew && idData) {
      //   //Update
      //   const id = (validationArguments.object as any)[idData];
      //   if (id) {
      //     const oldData = await checkModel.findFirst({
      //       where: {
      //         id: id,
      //         [propertyName]: value,
      //       },
      //     });
      //     if (oldData) return true;
      //     return false;
      //   } else {
      //     return false;
      //   }
      // }
      const checkData = await checkModel.findUnique({
        where: {
          [propertyName]: value,
        },
      });
      if (!checkData) return true;
      if (!isNew && idData) {
        const id = (validationArguments.object as any)[idData];
        if (id && id == checkData.id) return true;
        else return false;
      } else return false;
    } else return false;
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
VD kiểm tra xem model User có username là admin hay chưa khi Create:
DBUnique('user-decorate', username)
VD kiểm tra xem model User có username là admin hay chưa khi Update:
DBUnique('user-decorate', username, userId, true)
 */
export function DBUnique(
  model: string,
  propertyName: string,
  idData = '',
  isNew = false,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'DBUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, propertyName, idData, isNew],
      validator: DBUniqueConstraint,
    });
  };
}
