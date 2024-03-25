import { Mixin } from 'ts-mixer';
import { TitleContentSummaryDto } from '../../../middleware/dto/title-content-summary.dto';
import { HeadMeta } from '../../../middleware/dto/head-meta';
import { RatingFieldsDto } from '../../../middleware/dto/rating-fields.dto';
import { VideoIdOptionalDto } from '../../../middleware/dto/video-id-optional.dto';
import { PublisherIdOptionalDto } from '../../../middleware/dto/publisher-id.optional.dto';
import { AuthorIdOptionalDto } from '../../../middleware/dto/author-id-optional.dto';
import { DisabledDto } from '../../../middleware/dto/disabled.dto';
import { DomainIdDto } from '../../../middleware/dto/domain-id.dto';
import { UploadDateDto } from '../../../middleware/dto/upload-date.dto';
import { AdminPageImageDto } from './admin-page-image.dto';

export class AdminPageCreateDto extends Mixin(
  TitleContentSummaryDto,
  HeadMeta,
  RatingFieldsDto,
  VideoIdOptionalDto,
  UploadDateDto,
  PublisherIdOptionalDto,
  AuthorIdOptionalDto,
  DomainIdDto,
  DisabledDto,
  AdminPageImageDto,
) {}
