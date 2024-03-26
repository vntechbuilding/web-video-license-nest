import { decorate, Mixin } from 'ts-mixer';
import { TemplateIdDto } from '../../../middleware/dto/template-id.dto';
import { IsEnum, IsJSON, IsNotEmpty } from 'class-validator';
import { dataType, templateType } from '@prisma/client';
import { SortOrderDto } from '../../../middleware/dto/sortOrder.dto';

export class AdminTemplateDataCreateDto extends Mixin(
  TemplateIdDto,
  SortOrderDto,
) {
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

  @decorate(
    IsNotEmpty({
      message: 'Tên không được để trống',
    }),
  )
  readonly name: string;

  @decorate(
    IsNotEmpty({
      message: 'Code không được để trống',
    }),
  )
  readonly code: string;

  @decorate(
    IsNotEmpty({
      message: 'Config không được để trống',
    }),
  )
  @decorate(
    IsJSON({
      message: 'Config phải là một chuỗi JSON hợp lệ',
    }),
  )
  readonly config: string;
}
