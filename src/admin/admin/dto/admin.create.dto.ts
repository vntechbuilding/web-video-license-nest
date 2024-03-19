import { AdminDataDto } from './admin.data.dto';
import { PasswordConfirmDto } from '../../../middleware/dto/password-confirm.dto';
import { Mixin } from 'ts-mixer';

export class AdminCreateDto extends Mixin(AdminDataDto, PasswordConfirmDto) {}
