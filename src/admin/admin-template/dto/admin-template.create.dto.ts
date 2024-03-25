import { decorate, Mixin } from 'ts-mixer';
import { AdminTemplateCodeDto } from './admin-template-code.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { DisabledDto } from '../../../middleware/dto/disabled.dto';
import { HeadMetaImageValid } from '../../../middleware/validator/head-meta/head-meta-image.valid';
import { ImageAutoValid } from '../../../middleware/validator/image-auto.valid';

export class AdminTemplateCreateDto extends Mixin(
  AdminTemplateCodeDto,
  DisabledDto,
) {
  @decorate(
    IsNotEmpty({
      message: 'Tên không được để trống',
    }),
  )
  readonly name: string;
  @decorate(
    IsNotEmpty({
      message: 'Giới thiệu không được để trống',
    }),
  )
  readonly description: string;
  @decorate(
    IsNotEmpty({
      message: 'Version không được để trống',
    }),
  )
  readonly version: string;

  @decorate(IsOptional())
  @decorate(
    ImageAutoValid('template', 'templateId', 'image', {
      message: 'Hình ảnh không hợp lệ',
    }),
  )
  readonly image: string;
}
