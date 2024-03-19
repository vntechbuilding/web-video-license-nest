import { IsNotEmpty } from 'class-validator';
import { UserPasswordLoginValid } from '../../../../middleware/validator/user/user-password-login.valid';
import { RecaptchaDto } from '../../../../middleware/dto/recaptcha.dto';
import { Mixin } from 'ts-mixer';

export class UserAuthLoginDto extends Mixin(RecaptchaDto) {
  @IsNotEmpty({
    message: 'Tài khoản không được để trống',
  })
  readonly username: string;
  @IsNotEmpty({
    message: 'Mật khẩu không được để trống',
  })
  @UserPasswordLoginValid({ message: 'Tài khoản hoặc mật khẩu không hợp lệ' })
  readonly password: string;
}
