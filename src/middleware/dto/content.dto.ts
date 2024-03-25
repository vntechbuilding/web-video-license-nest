import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { TransformHtmlSanitize } from '../../utils/transforms/transform-html-sanitize';
export class ContentDto {
  @decorate(TransformHtmlSanitize())
  @decorate(
    IsNotEmpty({
      message: 'Nội dung không được để trống',
    }),
  )
  readonly content: string;
}
