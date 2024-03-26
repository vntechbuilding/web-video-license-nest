import { decorate, Mixin } from 'ts-mixer';
import { AdminDomainTemplateCreateDto } from './admin-domain-template.create.dto';
import { IsNotEmpty } from 'class-validator';
import { PageDomainIdValid } from '../../../middleware/validator/page/page-domain-id.valid.dto';
import { DomainTemplateCodeTypeValid } from '../../../middleware/validator/domain-template/domain-template-code-type.valid.dto';

export class AdminDomainTemplatePageCreateDto extends Mixin(
  AdminDomainTemplateCreateDto,
) {
  @decorate(
    IsNotEmpty({
      message: 'Code không được để trống',
    }),
  )
  @decorate(DomainTemplateCodeTypeValid('PAGE'))
  readonly code: string;
  @decorate(
    IsNotEmpty({
      message: 'Trang không được để trống',
    }),
  )
  @decorate(PageDomainIdValid())
  readonly refId: string;
}
