import { decorate, Mixin } from 'ts-mixer';
import { AdminDomainTemplateCreateDto } from './admin-domain-template.create.dto';
import { IsNotEmpty } from 'class-validator';
import { DomainTemplateImageValid } from '../../../middleware/validator/domain-template/domain-template-image.valid';

export class AdminDomainTemplateImageCreateDto extends Mixin(
  AdminDomainTemplateCreateDto,
) {
  @decorate(
    IsNotEmpty({
      message: 'Code không được để trống',
    }),
  )
  readonly code: string;

  @decorate(
    IsNotEmpty({
      message: 'Dữ liệu không được để trống',
    }),
  )
  @decorate(DomainTemplateImageValid())
  readonly content: string;
}
