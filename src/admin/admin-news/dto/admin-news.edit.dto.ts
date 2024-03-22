import { Mixin } from 'ts-mixer';
import { NewsIdDto } from '../../../middleware/dto/news-id.dto';
import { AdminNewsCreateDto } from './admin-news.create.dto';

export class AdminNewsEditDto extends Mixin(NewsIdDto, AdminNewsCreateDto) {}
