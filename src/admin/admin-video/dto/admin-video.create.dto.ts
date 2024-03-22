import { Mixin, decorate } from 'ts-mixer';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { IsIso8601 } from '../../../middleware/validator/is-iso-8601.validator';
import { HeadMetaImageValid } from '../../../middleware/validator/head-meta/head-meta-image.valid';
import { Transform, Type } from 'class-transformer';
import { UserIdDto } from '../../../middleware/dto/user-id.dto';
import { IsIso8601Duration } from '../../../middleware/validator/is-iso-8601-duration.validator';

export class AdminVideoCreateDto extends Mixin(UserIdDto) {
  @decorate(
    IsNotEmpty({
      message: 'Tên video không được để trống',
    }),
  )
  readonly name: string;
  @decorate(
    IsNotEmpty({
      message: 'Thông tin video không được để trống',
    }),
  )
  readonly description: string;
  @decorate(
    IsNotEmpty({
      message: 'Thời lượng video không được để trống',
    }),
  )
  @decorate(IsIso8601Duration())
  readonly duration: string;

  @decorate(HeadMetaImageValid('newsCategory', 'categoryId', 'thumbnail'))
  readonly thumbnail: string;

  @decorate(IsNumber())
  @decorate(Type(() => Number))
  @decorate(Max(999999999))
  @decorate(Min(0))
  @decorate(
    Transform(({ value }) => {
      return +value || 0;
    }),
  )
  readonly totalWatch: number;

  @decorate(
    IsNotEmpty({
      message: 'Ngày tải lên không được để trống',
    }),
  )
  @decorate(IsIso8601())
  readonly uploadDate: string;

  //TODO Upload image
  @decorate(IsString())
  readonly file: string = '';
}
