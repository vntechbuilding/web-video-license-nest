import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { DBValueExists } from '../validator/db-value.exists';

export class TemplateIdDto {
  @decorate(
    IsNotEmpty({
      message: 'Template không hợp lệ',
    }),
  )
  @decorate(
    DBValueExists('template', 'id', {
      message: 'Template không hợp lệ',
    }),
  )
  readonly templateId: string;
}
