import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { DBValueExists } from '../validator/db-value.exists';

export class MenuIdDto {
  @decorate(
    IsNotEmpty({
      message: 'Menu không hợp lệ',
    }),
  )
  @decorate(
    DBValueExists('menu', 'id', {
      message: 'Menu không hợp lệ',
    }),
  )
  readonly menuId: string;
}
