import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { removeHtmlTags } from '../../utils/transforms/transform-html-sanitize';

export class SummaryDto {
  @decorate(
    IsNotEmpty({
      message: 'Nội dung tóm tắt không được để trống',
    }),
  )
  @decorate(removeHtmlTags())
  readonly summary: string;
}
