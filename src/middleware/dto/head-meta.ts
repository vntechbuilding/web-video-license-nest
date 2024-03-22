import { decorate } from 'ts-mixer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { HeadMetaImageValid } from '../validator/head-meta/head-meta-image.valid';

export class HeadMeta {
  @decorate(IsNotEmpty({ message: 'Meta Title không được để trống' }))
  readonly metaTitle: string;
  @decorate(IsNotEmpty({ message: 'Meta Description không được để trống' }))
  readonly metaDescription: string;
}
