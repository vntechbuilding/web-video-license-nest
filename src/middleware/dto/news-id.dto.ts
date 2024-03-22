import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { DBValueExists } from '../validator/db-value.exists';

export class NewsIdDto {
  @decorate(IsNotEmpty({ message: 'Bài viết không hợp lệ' }))
  @decorate(DBValueExists('news', 'id', { message: 'Bài viết không hợp lệ' }))
  readonly newsId: string;
}
