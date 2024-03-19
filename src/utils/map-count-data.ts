import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
export function mapCountData<T>(
  source: Promise<[T[], number]>,
): Observable<{ data: T[]; count: number }> {
  return from(source).pipe(map(([data, count]) => ({ data, count })));
}
