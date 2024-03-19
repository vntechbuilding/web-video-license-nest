import { Mixin } from 'ts-mixer';
import { UserIdDto } from './user-id.dto';
import { DisabledDto } from '../../../middleware/dto/disabled.dto';

export class UserUpdateDisabledDto extends Mixin(UserIdDto, DisabledDto) {}
