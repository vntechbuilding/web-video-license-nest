import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { TransformHtmlSanitize } from '../../utils/transforms/transform-html-sanitize';
import { TransformHtml } from '../validator/html/transform-html.validator';
export class ContentDto {
  @decorate(
    IsNotEmpty({
      message: 'Nội dung không được để trống',
    }),
  )
  @decorate(TransformHtml())
  readonly content: string;
}
