import { decorate, Mixin } from 'ts-mixer';
import { HeadMeta } from '../../../middleware/dto/head-meta';
import { AdminNewsImageDto } from './admin-news-image.dto';
import { RatingFieldsDto } from '../../../middleware/dto/rating-fields.dto';
import { UploadDateDto } from '../../../middleware/dto/upload-date.dto';
import { VideoIdOptionalDto } from '../../../middleware/dto/video-id-optional.dto';
import { AuthorIdOptionalDto } from '../../../middleware/dto/author-id-optional.dto';
import { PublisherIdOptionalDto } from '../../../middleware/dto/publisher-id.optional.dto';
import { DisabledDto } from '../../../middleware/dto/disabled.dto';
import { TitleContentSummaryDto } from '../../../middleware/dto/title-content-summary.dto';
import { NewsCategoryDomainIdDto } from '../../../middleware/dto/news-category-domain-id.dto';

export class AdminNewsCreateDto extends Mixin(
  HeadMeta,
  AdminNewsImageDto,
  RatingFieldsDto,
  TitleContentSummaryDto,
  UploadDateDto,
  VideoIdOptionalDto,
  AuthorIdOptionalDto,
  PublisherIdOptionalDto,
  DisabledDto,
  NewsCategoryDomainIdDto,
) {}
