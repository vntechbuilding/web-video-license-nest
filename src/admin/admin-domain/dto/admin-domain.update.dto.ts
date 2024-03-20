import { decorate, Mixin } from 'ts-mixer';
import { DisabledDto } from '../../../middleware/dto/disabled.dto';
import { IsNotEmpty } from 'class-validator';
import { DBValueExists } from '../../../middleware/validator/db-value.exists';

export class AdminDomainUpdateDto extends Mixin(DisabledDto) {
  @decorate(IsNotEmpty({ message: 'Tài khoản không hợp lệ' }))
  @decorate(
    DBValueExists('user', 'id', { message: 'Tài khoản không tồn tại' }, false),
  )
  readonly userId: string;

  @decorate(IsNotEmpty({ message: 'Tên miền không được để trống' }))
  @decorate(
    DBValueExists('domain', 'id', { message: 'Tên miền không tồn tại' }, false),
  )
  readonly id: string;
}
