import { decorate, Mixin } from 'ts-mixer';
import { RecaptchaDto } from '../../../../middleware/dto/recaptcha.dto';
import { PasswordConfirmDto } from '../../../../middleware/dto/password-confirm.dto';
import { IsNotEmpty } from 'class-validator';
import { DBValueExists } from '../../../../middleware/validator/db-value.exists';

export class UserAuthResetPasswordDto extends Mixin(
  RecaptchaDto,
  PasswordConfirmDto,
) {
  @decorate(IsNotEmpty({ message: 'Mã xác nhận không hợp lệ' }))
  @decorate(
    DBValueExists('userForgotPasswordCode', 'code', {
      message: 'Mã xác nhận không hợp lệ',
    }),
  )
  code: string = '';
}
