import { decorate } from 'ts-mixer';
import { DBValueExists } from '../validator/db-value.exists';
import { IsOptional } from 'class-validator';

export class PublisherIdOptionalDto {
  @decorate(IsOptional())
  @decorate(
    DBValueExists('publisher', 'id', { message: 'Publisher không hợp lệ' }),
  )
  readonly publisherId: string;
}
