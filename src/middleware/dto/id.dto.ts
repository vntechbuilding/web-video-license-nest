import { IsNotEmpty } from 'class-validator';
import { decorate } from 'ts-mixer';

export class IdDto {
  @decorate(IsNotEmpty())
  readonly id: string;
}
