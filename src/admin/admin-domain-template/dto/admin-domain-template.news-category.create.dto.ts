import { decorate, Mixin } from 'ts-mixer';
import { AdminDomainTemplateCreateDto } from './admin-domain-template.create.dto';
import { IsNotEmpty } from 'class-validator';
import { NewsCategoryDomainIdValid } from '../../../middleware/validator/news-category/news-category-domain-id.valid.dto';
import { DomainTemplateCodeTypeValid } from '../../../middleware/validator/domain-template/domain-template-code-type.valid.dto';

export class AdminDomainTemplateNewsCategoryCreateDto extends Mixin(
  AdminDomainTemplateCreateDto,
) {
  @decorate(
    IsNotEmpty({
      message: 'Code không được để trống',
    }),
  )
  @decorate(DomainTemplateCodeTypeValid('NEWS_CATEGORY'))
  readonly code: string;
  @decorate(
    IsNotEmpty({
      message: 'Danh mục không được để trống',
    }),
  )
  @decorate(NewsCategoryDomainIdValid())
  readonly refId: string;
}
