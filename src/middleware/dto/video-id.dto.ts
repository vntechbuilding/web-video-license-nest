import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';
import { DBValueExists } from '../validator/db-value.exists';

export class VideoIdDto {
  @decorate(IsNotEmpty({ message: 'Video không hợp lệ' }))
  @decorate(DBValueExists('video', 'id', { message: 'Video không hợp lệ' }))
  readonly videoId: string;
}
