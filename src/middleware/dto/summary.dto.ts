import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { escapeHtml } from '../../utils/transforms/transform-html-sanitize';

export class SummaryDto {
  @decorate(escapeHtml())
  @decorate(
    IsNotEmpty({
      message: 'Nội dung tóm tắt không được để trống',
    }),
  )
  readonly summary: string;
}
