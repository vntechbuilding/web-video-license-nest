import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { DBValueExists } from '../validator/db-value.exists';

export class PublisherIdDto {
  @decorate(IsNotEmpty({ message: 'Publisher không hợp lệ' }))
  @decorate(
    DBValueExists('author', 'id', { message: 'Publisher không hợp lệ' }),
  )
  readonly publisherId: string;
}
