import { Mixin } from 'ts-mixer';
import { TemplateDataIdDto } from '../../../middleware/dto/template-data-id.dto';
import { AdminTemplateDataCreateDto } from './admin-template-data.create.dto';

export class AdminTemplateDataUpdateDto extends Mixin(
  TemplateDataIdDto,
  AdminTemplateDataCreateDto,
) {}
