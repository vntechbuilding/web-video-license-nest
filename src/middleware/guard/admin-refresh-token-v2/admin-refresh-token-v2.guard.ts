import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { from, Observable, switchMap } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminAuthService } from '../../../admin/admin-auth/admin-auth.service';
import { invalidTokenInformation } from '../../../utils/auth-utils/auth-utils';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminRefreshTokenV2Guard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private adminAuthService: AdminAuthService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token, authorization } = request.headers as any; //member
    if (!token || !authorization) {
      invalidTokenInformation();
    }
    return this.adminAuthService.decodeToken(authorization, token, false).pipe(
      switchMap((decoded) => {
        if (decoded && decoded.adminId) {
          return from(
            this.prisma.admin.findUnique({
              where: {
                id: decoded.adminId,
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
  }
}
