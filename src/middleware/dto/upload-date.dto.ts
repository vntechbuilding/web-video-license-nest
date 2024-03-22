import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { IsIso8601 } from '../validator/is-iso-8601.validator';

export class UploadDateDto {
  @decorate(
    IsNotEmpty({
      message: 'Ngày tải lên không được để trống',
    }),
  )
  @decorate(IsIso8601())
  readonly uploadDate: string;
}
