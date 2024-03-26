import { decorate, Mixin } from 'ts-mixer';
import { TemplateIdDto } from '../../../middleware/dto/template-id.dto';
import { IsJSON, IsNotEmpty } from 'class-validator';
import { SortOrderDto } from '../../../middleware/dto/sortOrder.dto';
import { TemplateTypeDto } from '../../../middleware/dto/template-type.dto';
import { DataTypeDto } from '../../../middleware/dto/data-type.dto';
import { Transform } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { IsValidJSON } from '../../../middleware/validator/is-valid-json';

export class AdminTemplateDataCreateDto extends Mixin(
  TemplateIdDto,
  SortOrderDto,
  TemplateTypeDto,
  DataTypeDto,
) {
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
    Transform(({ value }) => {
      try {
        if (typeof value === 'string') {
          return JSON.parse(value);
        }
        return value;
      } catch (e) {
        return null;
      }
    }),
  )
  @decorate(
    IsValidJSON({
      message: 'Config phải là một chuỗi JSON hợp lệ',
    }),
  )
  readonly config: Prisma.JsonValue;
}
