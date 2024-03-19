import { IsNotEmpty } from 'class-validator';
import { DBValueExists } from '../../../middleware/validator/db-value.exists';
import { decorate } from 'ts-mixer';

export class UserIdDto {
  @decorate(IsNotEmpty({ message: 'id is required' }))
  @decorate(DBValueExists('user', 'id', { message: 'id is not valid' }))
  readonly id: string;
}
