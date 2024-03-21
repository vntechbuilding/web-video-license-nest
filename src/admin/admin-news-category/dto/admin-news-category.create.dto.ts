import { decorate, Mixin } from 'ts-mixer';
import { DomainIdDto } from '../../../middleware/dto/domain-id.dto';
import { DescriptionDto } from '../../../middleware/dto/description.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { NewsCategoryParentIdValid } from '../../../middleware/validator/news-category/news-category-parent-id.valid';

export class AdminNewsCategoryCreateDto extends Mixin(
  // UserIdDto,
  DomainIdDto,
  DescriptionDto,
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
}
