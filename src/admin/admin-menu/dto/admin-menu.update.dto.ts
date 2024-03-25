import { Mixin } from 'ts-mixer';
import { AdminMenuCreateDto } from './admin-menu.create.dto';
import { MenuIdDto } from '../../../middleware/dto/menu-id.dto';

export class AdminMenuUpdateDto extends Mixin(AdminMenuCreateDto, MenuIdDto) {}
