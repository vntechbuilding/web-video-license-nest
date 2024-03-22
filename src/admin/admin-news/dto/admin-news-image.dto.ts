import { decorate } from 'ts-mixer';
import { IsOptional } from 'class-validator';
import { HeadMetaImageValid } from '../../../middleware/validator/head-meta/head-meta-image.valid';

export class AdminNewsImageDto {
  @decorate(IsOptional())
  @decorate(
    HeadMetaImageValid('news', 'newsId', 'metaImage', {
      message: 'Hình ảnh không hợp lệ',
    }),
  )
  readonly metaImage: string;

  @decorate(IsOptional())
  @decorate(
    HeadMetaImageValid('news', 'newsId', 'image', {
      message: 'Hình ảnh không hợp lệ',
    }),
  )
  readonly image: string;
}
