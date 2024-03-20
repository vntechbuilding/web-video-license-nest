import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { DBValueExists } from '../validator/db-value.exists';

export class DomainIdDto {
  @decorate(IsNotEmpty({ message: 'Tên miền không được để trống' }))
  @decorate(
    DBValueExists('domain', 'id', { message: 'Tên miền không tồn tại' }, false),
  )
  readonly domainId: string;
}
