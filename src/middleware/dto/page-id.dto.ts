import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { DBValueExists } from '../validator/db-value.exists';

export class PageIdDto {
  @decorate(IsNotEmpty({ message: 'Trang không hợp lệ' }))
  @decorate(DBValueExists('page', 'id', { message: 'Trang không hợp lệ' }))
  readonly pageId: string;
}
