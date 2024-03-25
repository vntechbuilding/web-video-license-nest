import { Mixin } from 'ts-mixer';
import { AdminPageCreateDto } from './admin-page.create.dto';
import { PageIdDto } from '../../../middleware/dto/page-id.dto';

export class AdminPageEditDto extends Mixin(AdminPageCreateDto, PageIdDto) {}
