import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { RecaptchaValid } from '../validator/recaptcha-valid';

export class RecaptchaDto {
  @decorate(
    IsNotEmpty({
      message: 'Xác thực người dùng thất bại',
    }),
  )
  @decorate(RecaptchaValid())
  readonly recaptcha: string = '';
}
