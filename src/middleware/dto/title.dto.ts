import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';

export class TitleDto {
  @decorate(IsNotEmpty({ message: 'Tiêu đề không được để trống' }))
  readonly title: string;
}
