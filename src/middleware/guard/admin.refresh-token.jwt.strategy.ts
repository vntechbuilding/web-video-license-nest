import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
import {
  invalidToken,
  invalidTokenInformation,
} from '../../utils/auth-utils/auth-utils';
import { AdminAuthService } from '../../admin/admin-auth/admin-auth.service';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AdminRefreshTokenJwtStrategy extends PassportStrategy(
  Strategy,
  'adminRefreshToken',
) {
  constructor(
    private prisma: PrismaService,
    private authService: AdminAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: async (
        request: Request,
        rawJwtToken: string,
        done: (...args: any[]) => void,
      ) => {
        try {
          const { token } = request.headers as any;
          if (!token) return done(invalidToken);
          const decoded = await firstValueFrom(
            this.authService.decodeToken(rawJwtToken, token, false),
          );
          done(null, decoded.adminAuthToken.publicKey);
        } catch (e) {
          done(e);
        }
      },
    });
  }

  async validate(data: { tokenId: string; adminId: string }): Promise<any> {
    const adminData = await this.prisma.admin.findUnique({
      where: {
        id: data.adminId,
      },
    });
    if (!adminData || adminData.disabled) {
      invalidTokenInformation();
    } else {
      return { ...adminData, authToken: data };
    }
  }
}
