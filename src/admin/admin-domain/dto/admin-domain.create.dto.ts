import { decorate, Mixin } from 'ts-mixer';
import { IsNotEmpty, IsUrl } from 'class-validator';
import { DBUnique } from '../../../middleware/validator/db-unique';
import { DBValueExists } from '../../../middleware/validator/db-value.exists';
import { DisabledDto } from '../../../middleware/dto/disabled.dto';

export class AdminDomainCreateDto extends Mixin(DisabledDto) {
  @decorate(IsNotEmpty({ message: 'Tên miền không được để trống' }))
  @decorate(
    IsUrl({ require_protocol: true }, { message: 'Tên miền không hợp lệ' }),
  )
  @decorate(
    DBUnique('domain', 'domain', '', true, {
      message: 'Tên miền đã tồn tại',
    }),
  )
  readonly domain: string;

  @decorate(IsNotEmpty({ message: 'Tài khoản không hợp lệ' }))
  @decorate(
    DBValueExists('user', 'id', { message: 'Tài khoản không tồn tại' }, false),
  )
  readonly userId: string;
}
