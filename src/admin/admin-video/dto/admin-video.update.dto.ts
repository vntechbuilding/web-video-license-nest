import { Mixin } from 'ts-mixer';
import { AdminVideoCreateDto } from './admin-video.create.dto';
import { VideoIdDto } from '../../../middleware/dto/video-id.dto';

export class AdminVideoUpdateDto extends Mixin(
  AdminVideoCreateDto,
  VideoIdDto,
) {}
