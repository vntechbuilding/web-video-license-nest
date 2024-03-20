import { decorate, Mixin } from 'ts-mixer';
// import { UserIdDto } from '../../../middleware/dto/user-id.dto';
import { DomainIdDto } from '../../../middleware/dto/domain-id.dto';
import { DescriptionDto } from '../../../middleware/dto/description.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { DBValueExists } from '../../../middleware/validator/db-value.exists';

export class AdminNewsCategoryCreateDto extends Mixin(
  // UserIdDto,
  DomainIdDto,
  DescriptionDto,
) {
  @decorate(IsNotEmpty({ message: 'Tiêu đề không được để trống' }))
  readonly name: string;

  @decorate(IsOptional())
  @decorate(
    DBValueExists(
      'newsCategory',
      'id',
      { message: 'Danh mục không tồn tại' },
      true,
    ),
  )
  readonly parentId?: string;
}
