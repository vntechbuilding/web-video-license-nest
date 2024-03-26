import { decorate } from 'ts-mixer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { templateType } from '@prisma/client';

export class TemplateTypeDto {
  @decorate(
    IsNotEmpty({
      message: 'Loại trang không được để trống',
    }),
  )
  @decorate(
    IsEnum(templateType, {
      message: 'Loại trang phải nằm trong danh sách cho phép',
    }),
  )
  readonly templateType: templateType;
}
