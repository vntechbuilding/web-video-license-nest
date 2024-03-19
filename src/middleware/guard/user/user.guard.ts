import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { from, Observable, switchMap } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';
import { ApiV1AuthService } from '../../../api/api-v1/api-v1-auth/api-v1-auth.service';
import { invalidTokenInformation } from '../../../utils/auth-utils/auth-utils';
import { map } from 'rxjs/operators';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private apiV1AuthService: ApiV1AuthService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token, authorization } = request.headers as any; //member
    if (!token || !authorization) {
      invalidTokenInformation();
    }
    return this.apiV1AuthService.decodeToken(authorization, token, true).pipe(
      switchMap((decoded) => {
        if (decoded && decoded.userId) {
          return from(
            this.prisma.user.findUnique({
              where: {
                id: decoded.userId,
                disabled: false,
              },
            }),
          ).pipe(
            map((user) => {
              if (user) {
                const userData = { ...user, authToken: decoded };
                request.user = userData;
                return true;
              }
              invalidTokenInformation();
            }),
          );
        }
        invalidTokenInformation();
      }),
    );
    // return true;
  }
}
