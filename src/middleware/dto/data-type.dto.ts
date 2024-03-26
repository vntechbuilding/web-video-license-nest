import { decorate } from 'ts-mixer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { dataType } from '@prisma/client';

export class DataTypeDto {
  @decorate(
    IsNotEmpty({
      message: 'Loại dữ liệu không được để trống',
    }),
  )
  @decorate(
    IsEnum(dataType, {
      message: 'Loại dữ liệu phải nằm trong danh sách cho phép',
    }),
  )
  readonly dataType: dataType;
}
