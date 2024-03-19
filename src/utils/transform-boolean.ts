import { Transform } from 'class-transformer';

export const TransformBoolean = Transform(({ value }) => {
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
});
