import { IsNotEmpty } from 'class-validator';
import { decorate } from 'ts-mixer';
import { DBValueExists } from '../validator/db-value.exists';

export class TemplateDataIdDto {
  @decorate(
    IsNotEmpty({
      message: 'Dữ liệu không được để trống',
    }),
  )
  @decorate(
    DBValueExists('templateData', 'id', {
      message: 'Dữ liệu không hợp lệ',
    }),
  )
  readonly templateDataId: string;
}
