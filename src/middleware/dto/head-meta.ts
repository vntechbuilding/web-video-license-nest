import { decorate } from 'ts-mixer';
import { IsNotEmpty } from 'class-validator';

export class HeadMeta {
  @decorate(IsNotEmpty({ message: 'Meta Title không được để trống' }))
  readonly metaTitle: string;
  @decorate(IsNotEmpty({ message: 'Meta Description không được để trống' }))
  readonly metaDescription: string;
}
