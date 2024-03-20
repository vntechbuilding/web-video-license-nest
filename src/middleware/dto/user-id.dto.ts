import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { DBValueExists } from '../validator/db-value.exists';

export class UserIdDto {
  @decorate(IsNotEmpty({ message: 'id is required' }))
  @decorate(DBValueExists('user', 'id', { message: 'id is not valid' }))
  readonly userId: string;
}
