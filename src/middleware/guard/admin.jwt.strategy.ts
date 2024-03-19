import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AdminAuthService } from '../../admin/admin-auth/admin-auth.service';
import {
  invalidToken,
  invalidTokenInformation,
} from '../../utils/auth-utils/auth-utils';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(
    private prisma: PrismaService,
    private adminAuthService: AdminAuthService,
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
            this.adminAuthService.decodeToken(rawJwtToken, token, true),
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
      // return memberData;
      return { ...adminData, authToken: data };
    }
  }
}
