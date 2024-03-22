import { Mixin } from 'ts-mixer';
import { TitleDto } from './title.dto';
import { ContentDto } from './content.dto';
import { SummaryDto } from './summary.dto';

export class TitleContentSummaryDto extends Mixin(
  TitleDto,
  ContentDto,
  SummaryDto,
) {}
