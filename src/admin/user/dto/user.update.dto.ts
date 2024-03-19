import { decorate, Mixin } from 'ts-mixer';
import { DisabledDto } from '../../../middleware/dto/disabled.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { DBUnique } from '../../../middleware/validator/db-unique';
import { UserIdDto } from './user-id.dto';
import { Transform } from 'class-transformer';

export class UserUpdateDto extends Mixin(DisabledDto, UserIdDto) {
  // @decorate(IsNotEmpty())
  // @decorate(
  //   DBUnique('user', 'username', 'id', false, {
  //     message: 'Username is already exists',
  //   }),
  // )
  // readonly username: string = '';
  @decorate(IsNotEmpty())
  readonly fullName: string = '';

  @decorate(IsNotEmpty())
  @decorate(Transform(({ value }) => value.toLowerCase()))
  @decorate(
    DBUnique('user', 'phone', 'id', false, {
      message: 'Phone is already exists',
    }),
  )
  readonly phone: string = '';

  @decorate(IsNotEmpty())
  @decorate(Transform(({ value }) => value.toLowerCase()))
  @decorate(
    DBUnique('user', 'email', 'id', false, {
      message: 'Email is already exists',
    }),
  )
  readonly email: string = '';

  // @decorate(IsNotEmpty())
  // @decorate(
  //   DBUnique('user', 'accountName', 'id', false, {
  //     message: 'Account name is already exists',
  //   }),
  // )
  // readonly accountName: string = '';
}
