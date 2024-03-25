import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { unlinkSync } from 'fs';
import { Request } from 'express';

@Injectable()
export class CleanupInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(null, (exception) => {
        if (exception) {
          const request: Request = context.switchToHttp().getRequest();
          if (request.file) {
            // console.log(request.file);
            try {
              unlinkSync(request.file.path);
            } catch (e) {}
          }
          if (request.files && Array.isArray(request.files)) {
            request.files.forEach((file) => {
              try {
                unlinkSync(file.path);
              } catch (e) {}
            });
          }
        }
      }),
    );
  }
}
