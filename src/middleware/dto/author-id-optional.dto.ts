import { decorate } from 'ts-mixer';
import { DBValueExists } from '../validator/db-value.exists';
import { IsOptional } from 'class-validator';

export class AuthorIdOptionalDto {
  @decorate(IsOptional())
  @decorate(DBValueExists('author', 'id', { message: 'Tác giả không hợp lệ' }))
  readonly authorId: string;
}
