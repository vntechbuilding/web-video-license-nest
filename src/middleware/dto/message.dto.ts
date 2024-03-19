import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';

export class MessageDto {
  @decorate(IsNotEmpty({ message: 'message is required' }))
  readonly message: string;
}
