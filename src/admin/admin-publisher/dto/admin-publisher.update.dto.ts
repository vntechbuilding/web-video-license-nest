import { Mixin } from 'ts-mixer';
import { PublisherIdDto } from '../../../middleware/dto/publisher-id.dto';
import { AdminPublisherCreateDto } from './admin-publisher.create.dto';

export class AdminPublisherUpdateDto extends Mixin(
  PublisherIdDto,
  AdminPublisherCreateDto,
) {}
