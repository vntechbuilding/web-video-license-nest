import { IsNotEmpty } from 'class-validator';
import { DisabledDto } from '../../../middleware/dto/disabled.dto';
import { decorate } from 'ts-mixer';
import { DBUnique } from '../../../middleware/validator/db-unique';

export class AdminDataDto extends DisabledDto {
  @decorate(IsNotEmpty())
  @decorate(
    DBUnique('admin', 'username', '', true, {
      message: 'Username already exists',
    }),
  )
  readonly username: string = '';
}
