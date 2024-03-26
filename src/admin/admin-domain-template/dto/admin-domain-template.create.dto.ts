import { Mixin } from 'ts-mixer';
import { DomainIdDto } from '../../../middleware/dto/domain-id.dto';
import { TemplateTypeDto } from '../../../middleware/dto/template-type.dto';

export class AdminDomainTemplateCreateDto extends Mixin(
  DomainIdDto,
  TemplateTypeDto,
) {}
