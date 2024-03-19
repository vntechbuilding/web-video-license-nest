import { Mixin } from 'ts-mixer';
import { IdDto } from '../../../middleware/dto/id.dto';
import { PasswordConfirmDto } from '../../../middleware/dto/password-confirm.dto';

export class AdminChangePasswordDto extends Mixin(IdDto, PasswordConfirmDto) {}
