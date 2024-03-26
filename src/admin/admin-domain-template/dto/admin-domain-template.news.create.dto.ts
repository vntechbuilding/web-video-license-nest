import { decorate, Mixin } from 'ts-mixer';
import { AdminDomainTemplateCreateDto } from './admin-domain-template.create.dto';
import { IsNotEmpty } from 'class-validator';
import { NewsDomainIdValid } from '../../../middleware/validator/news/news-domain-id.valid.dto';
import { DomainTemplateCodeTypeValid } from '../../../middleware/validator/domain-template/domain-template-code-type.valid.dto';

export class AdminDomainTemplateNewsCreateDto extends Mixin(
  AdminDomainTemplateCreateDto,
) {
  @decorate(
    IsNotEmpty({
      message: 'Code không được để trống',
    }),
  )
  @decorate(DomainTemplateCodeTypeValid('NEWS'))
  readonly code: string;
  @decorate(
    IsNotEmpty({
      message: 'Danh mục không được để trống',
    }),
  )
  @decorate(NewsDomainIdValid())
  readonly refId: string;
}
