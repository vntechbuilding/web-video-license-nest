import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { DBValueExists } from '../validator/db-value.exists';

export class NewsCategoryIdDto {
  @decorate(
    IsNotEmpty({
      message: 'Danh mục không hợp lệ',
    }),
  )
  @decorate(
    DBValueExists('newsCategory', 'id', {
      message: 'Danh mục không hợp lệ',
    }),
  )
  readonly categoryId: string;
}
