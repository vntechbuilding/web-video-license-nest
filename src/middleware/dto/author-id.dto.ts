import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { DBValueExists } from '../validator/db-value.exists';

export class AuthorIdDto {
  @decorate(IsNotEmpty({ message: 'Tác giả không hợp lệ' }))
  @decorate(DBValueExists('author', 'id', { message: 'Tác giả không hợp lệ' }))
  readonly authorId: string;
}
