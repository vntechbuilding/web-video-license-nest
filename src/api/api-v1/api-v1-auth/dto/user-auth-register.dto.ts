import { decorate, Mixin } from 'ts-mixer';
import { PasswordConfirmDto } from '../../../../middleware/dto/password-confirm.dto';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { DBUnique } from '../../../../middleware/validator/db-unique';
import { RecaptchaValid } from '../../../../middleware/validator/recaptcha-valid';

export class UserAuthRegisterDto extends Mixin(PasswordConfirmDto) {
  @decorate(
    IsNotEmpty({
      message: 'Họ tên không được để trống',
    }),
  )
  readonly fullName: string = '';

  @decorate(
    IsNotEmpty({
      message: 'Số điện thoại không được để trống',
    }),
  )
  @decorate(Transform(({ value }) => value.toLowerCase()))
  @decorate(
    DBUnique('user', 'phone', '', true, {
      message: 'Số điện thoại đã tồn tại',
    }),
  )
  @decorate(IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' }))
  readonly phone: string = '';

  @decorate(
    IsNotEmpty({
      message: 'Email không được để trống',
    }),
  )
  @decorate(Transform(({ value }) => value.toLowerCase()))
  @decorate(
    DBUnique('user', 'email', '', true, { message: 'Email đã tồn tại' }),
  )
  readonly email: string = '';

  @decorate(
    IsNotEmpty({
      message: 'Xác thực người dùng thất bại',
    }),
  )
  @decorate(RecaptchaValid())
  readonly recaptcha: string = '';
}
