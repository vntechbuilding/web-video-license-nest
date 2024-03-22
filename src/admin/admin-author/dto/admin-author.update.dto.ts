import { Mixin } from 'ts-mixer';
import { AuthorIdDto } from '../../../middleware/dto/author-id.dto';
import { AdminAuthorCreateDto } from './admin-author.create.dto';

export class AdminAuthorUpdateDto extends Mixin(
  AuthorIdDto,
  AdminAuthorCreateDto,
) {}
