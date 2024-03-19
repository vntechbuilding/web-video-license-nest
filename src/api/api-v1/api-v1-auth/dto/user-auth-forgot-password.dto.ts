import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { RecaptchaValid } from '../../../../middleware/validator/recaptcha-valid';
import { DBValueExists } from '../../../../middleware/validator/db-value.exists';

export class UserAuthForgotPasswordDto {
  @decorate(
    IsNotEmpty({
      message: 'Email không được để trống',
    }),
  )
  @decorate(Transform(({ value }) => value.toLowerCase()))
  @decorate(
    DBValueExists('user', 'email', {
      message: 'Email không hợp lệ',
    }),
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
