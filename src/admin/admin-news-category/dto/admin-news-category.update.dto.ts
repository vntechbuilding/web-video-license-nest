import { decorate, Mixin } from 'ts-mixer';
import { DomainIdDto } from '../../../middleware/dto/domain-id.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { NewsCategoryIdDto } from '../../../middleware/dto/news-category-id.dto';
import { NewsCategoryParentIdValid } from '../../../middleware/validator/news-category/news-category-parent-id.valid';
import { HeadMeta } from '../../../middleware/dto/head-meta';
import { HeadMetaImageValid } from '../../../middleware/validator/head-meta/head-meta-image.valid';
import { DisabledDto } from '../../../middleware/dto/disabled.dto';
import { ContentImageValid } from '../../../middleware/validator/content-image.valid';

export class AdminNewsCategoryUpdateDto extends Mixin(
  // UserIdDto,
  DomainIdDto,
  HeadMeta,
  NewsCategoryIdDto,
  DisabledDto,
) {
  @decorate(IsNotEmpty({ message: 'Tiêu đề không được để trống' }))
  readonly title: string;

  @decorate(IsOptional())
  @decorate(
    NewsCategoryParentIdValid({
      message: 'Danh mục không hợp lệ',
    }),
  )
  readonly parentId?: string;

  @decorate(IsOptional())
  @decorate(HeadMetaImageValid('newsCategory', 'categoryId', 'metaImage'))
  readonly metaImage: string;

  @decorate(IsOptional())
  @decorate(ContentImageValid('newsCategory', 'categoryId'))
  readonly image: string;
}
