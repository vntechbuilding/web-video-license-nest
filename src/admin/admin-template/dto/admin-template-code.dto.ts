import { decorate } from 'ts-mixer';
import { Transform } from 'class-transformer';
import { RandStr } from '../../../utils/rand-str';

export class AdminTemplateCodeDto {
  @decorate(
    Transform(({ value }) => {
      if (!value) {
        return RandStr(6).toUpperCase();
      }
      return value;
    }),
  )
  readonly code: string;
}
