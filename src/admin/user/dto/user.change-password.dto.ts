import { Mixin } from 'ts-mixer';
import { UserIdDto } from './user-id.dto';
import { PasswordConfirmDto } from '../../../middleware/dto/password-confirm.dto';

export class UserChangePasswordDto extends Mixin(
  UserIdDto,
  PasswordConfirmDto,
) {}
