import { Mixin } from 'ts-mixer';
import { AdminTemplateCreateDto } from './admin-template.create.dto';
import { TemplateIdDto } from '../../../middleware/dto/template-id.dto';

export class AdminTemplateUpdateDto extends Mixin(
  AdminTemplateCreateDto,
  TemplateIdDto,
) {}
