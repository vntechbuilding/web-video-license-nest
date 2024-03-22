import { decorate } from 'ts-mixer';
import { IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class RatingFieldsDto {
  @decorate(IsNotEmpty({ message: 'Điểm rating không được để trống' }))
  @decorate(IsNumber({}, { message: 'Điểm rating phải là số' }))
  @decorate(Min(0, { message: 'Điểm rating phải lớn hơn hoặc bằng 0' }))
  @decorate(Max(5, { message: 'Điểm rating phải nhỏ hơn hoặc bằng 5' }))
  readonly ratingValue: number;

  @decorate(IsNotEmpty({ message: 'Điểm rating lớn nhất không được để trống' }))
  @decorate(IsInt({ message: 'Điểm rating lớn nhất phải là số' }))
  @decorate(
    Min(0, { message: 'Điểm rating lớn nhất phải lớn hơn hoặc bằng 0' }),
  )
  @decorate(
    Max(5, { message: 'Điểm rating lớn nhất phải nhỏ hơn hoặc bằng 5' }),
  )
  readonly bestRating: number;

  @decorate(IsNotEmpty({ message: 'Tổng rating không được để trống' }))
  @decorate(IsInt({ message: 'Tổng rating phải là số' }))
  @decorate(Min(0, { message: 'Tổng rating phải lớn hơn hoặc bằng 0' }))
  @decorate(
    Max(999999999, { message: 'Tổng rating phải nhỏ hơn hoặc bằng 999999999' }),
  )
  readonly ratingCount: number;

  @decorate(IsNotEmpty({ message: 'Lượt xem bài không được để trống' }))
  @decorate(IsInt({ message: 'Lượt xem bài phải là số' }))
  @decorate(Min(0, { message: 'Lượt xem bài phải lớn hơn hoặc bằng 0' }))
  @decorate(
    Max(999999999, {
      message: 'Lượt xem bài phải nhỏ hơn hoặc bằng 999999999',
    }),
  )
  readonly totalRead: number;
}
