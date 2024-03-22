import { decorate } from 'ts-mixer';
import { DBValueExists } from '../validator/db-value.exists';
import { IsOptional } from 'class-validator';

export class VideoIdOptionalDto {
  @decorate(IsOptional())
  @decorate(DBValueExists('video', 'id', { message: 'Video không hợp lệ' }))
  readonly videoId: string;
}
