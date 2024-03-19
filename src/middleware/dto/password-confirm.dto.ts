import { IsNotEmpty, Matches } from 'class-validator';
import { Match } from '../validator/match.decorator';
import { decorate } from 'ts-mixer';

export class PasswordConfirmDto {
  @decorate(IsNotEmpty({ message: 'Password is required' }))
  @decorate(
    Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, {
      message:
        'Password must be at least 6 characters, including uppercase, lowercase letters and numbers',
    }),
  )
  readonly password: string = '';

  @decorate(Match('password', { message: 'Password Confirm is not valid' }))
  readonly passwordConfirm: string = '';
}
//'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and a minimum length of 6 characters'
