import { IsNotEmpty, IsOptional } from 'class-validator';
import { DBUnique } from '../../../middleware/validator/db-unique';
import { decorate, Mixin } from 'ts-mixer';
import { DisabledDto } from '../../../middleware/dto/disabled.dto';
import { PasswordConfirmDto } from '../../../middleware/dto/password-confirm.dto';
import { Transform } from 'class-transformer';

export class UserCreateDto extends Mixin(DisabledDto, PasswordConfirmDto) {
  // @decorate(IsNotEmpty())
  // @decorate(
  //   DBUnique('user', 'username', '', true, {
  //     message: 'Username is already exists',
  //   }),
  // )
  // readonly username: string = '';
  @decorate(IsNotEmpty())
  readonly fullName: string = '';

  @decorate(IsNotEmpty())
  @decorate(Transform(({ value }) => value.toLowerCase()))
  @decorate(
    DBUnique('user', 'phone', '', true, { message: 'Phone is already exists' }),
  )
  readonly phone: string = '';

  @decorate(IsNotEmpty())
  @decorate(Transform(({ value }) => value.toLowerCase()))
  @decorate(
    DBUnique('user', 'email', '', true, { message: 'Email is already exists' }),
  )
  readonly email: string = '';
  // @decorate(IsNotEmpty())
  // @decorate(
  //   DBUnique('user', 'accountName', '', true, {
  //     message: 'Account name is already exists',
  //   }),
  // )
  // readonly accountName: string = '';
}
