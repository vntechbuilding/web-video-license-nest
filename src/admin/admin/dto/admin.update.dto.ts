import { DisabledDto } from '../../../middleware/dto/disabled.dto';
import { Mixin } from 'ts-mixer';
import { IdDto } from '../../../middleware/dto/id.dto';

export class AdminUpdateDto extends Mixin(DisabledDto, IdDto) {}
