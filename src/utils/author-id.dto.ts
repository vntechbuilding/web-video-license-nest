import { decorate } from 'ts-mixer';
import { AuthorIdValid } from '../middleware/validator/author/author-id.valid';

export class AuthorIdDto {
  @decorate(AuthorIdValid({ message: 'Tác giả không hợp lệ' }))
  readonly authorId: string = null;
}
