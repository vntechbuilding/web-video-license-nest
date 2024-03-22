import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { unlinkSync } from 'fs';

@Injectable()
export class CleanupInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(null, (exception) => {
        if (exception) {
          const request = context.switchToHttp().getRequest();
          if (request.file) {
            console.log(request.file);
            try {
              unlinkSync(request.file.path);
            } catch (e) {}
          }
        }
      }),
    );
  }
}
