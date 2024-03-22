import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { NewsCategoryDomainIdValid } from '../validator/news-category/news-category-domain-id.valid.dto';

export class NewsCategoryDomainIdDto {
  @decorate(
    IsNotEmpty({
      message: 'Tên miền không hợp lệ',
    }),
  )
  readonly domainId: string;

  @decorate(
    IsNotEmpty({
      message: 'Danh mục không hợp lệ',
    }),
  )
  @decorate(NewsCategoryDomainIdValid())
  readonly categoryId: string;
}
