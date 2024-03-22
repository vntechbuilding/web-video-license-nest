import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { TransformHtmlSanitize } from '../../utils/transforms/transform-html-sanitize';
export class ContentDto {
  @decorate(
    IsNotEmpty({
      message: 'Nội dung không được để trống',
    }),
  )
  @decorate(TransformHtmlSanitize())
  readonly content: string;
}
