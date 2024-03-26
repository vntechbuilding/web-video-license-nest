import { decorate, Mixin } from 'ts-mixer';
import { AdminDomainTemplateCreateDto } from './admin-domain-template.create.dto';
import { IsNotEmpty } from 'class-validator';
import { DomainTemplateCodeTypeValid } from '../../../middleware/validator/domain-template/domain-template-code-type.valid.dto';
import { escapeHtml } from '../../../utils/transforms/transform-html-sanitize';

export class AdminDomainTemplateTextCreateDto extends Mixin(
  AdminDomainTemplateCreateDto,
) {
  @decorate(
    IsNotEmpty({
      message: 'Code không được để trống',
    }),
  )
  @decorate(DomainTemplateCodeTypeValid('TEXT'))
  readonly code: string;

  @decorate(
    IsNotEmpty({
      message: 'Dữ liệu không được để trống',
    }),
  )
  @decorate(escapeHtml())
  readonly content: string;
}
