import { decorate, Mixin } from 'ts-mixer';
import { SortOrderDto } from '../../../middleware/dto/sortOrder.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { DomainIdDto } from '../../../middleware/dto/domain-id.dto';
import { DBValueExists } from '../../../middleware/validator/db-value.exists';

export class AdminMenuCreateDto extends Mixin(SortOrderDto, DomainIdDto) {
  @decorate(
    IsNotEmpty({
      message: 'Tiêu đề không được để trống',
    }),
  )
  readonly title: string;
  @decorate(
    IsNotEmpty({
      message: 'URL không được để trống',
    }),
  )
  readonly url: string;
  @decorate(
    IsNotEmpty({
      message: 'Text không được để trống',
    }),
  )
  readonly text: string;

  @decorate(IsOptional())
  @decorate(
    DBValueExists(
      'menu',
      'id',
      {
        message: 'Menu không hợp lệ',
      },
      true,
    ),
  )
  readonly parentId: string;
}
