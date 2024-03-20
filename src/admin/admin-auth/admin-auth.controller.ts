import {
  Body,
  Controller,
  Get,
  Ip,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { from, map, of, switchMap } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { hash } from 'argon2';
import { AdminAuthService } from './admin-auth.service';
import { ReqParseAuthToken } from '../../middleware/decorator/req-parse-auth-token/req-parse-auth-token.decorator';
import { ReqUser } from '../../middleware/decorator/req-user/req-user.decorator';
import { admin } from '@prisma/client';
import { AdminAuthLoginDto } from './dto/admin-auth-login.dto';
import { AdminRefreshTokenV2Guard } from '../../middleware/guard/admin-refresh-token-v2/admin-refresh-token-v2.guard';
import { AdminV2Guard } from '../../middleware/guard/admin-v2/admin-v2.guard';

@Controller('api/admin/auth')
export class AdminAuthController {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private authService: AdminAuthService,
  ) {
    from(this.prisma.admin.count())
      .pipe(
        switchMap((count) => {
          if (!count || count === 0) {
            return from(hash(this.config.get('ADMIN_PASSWORD'))).pipe(
              switchMap((hashPassword) => {
                return this.prisma.admin.create({
                  data: {
                    username: this.config.get('ADMIN_USERNAME'),
                    hash: hashPassword,
                  },
                });
              }),
            );
          }
          return of(count);
        }),
      )
      .subscribe();
  }

  @Post()
  doLogin(
    @Body() loginData: AdminAuthLoginDto,
    @Req() request: Request,
    @Ip() ip: string,
  ) {
    return this.authService.login(
      loginData.username,
      loginData.password,
      ip,
      request.headers['user-agent'],
    );
  }
  @UseGuards(AdminRefreshTokenV2Guard)
  @Get('logout')
  logout(@ReqParseAuthToken() token: string) {
    return this.authService.logout(token).pipe(map(() => true));
  }
  @UseGuards(AdminV2Guard)
  @Get('check-token')
  checkToken() {
    return 'true';
  }

  @UseGuards(AdminRefreshTokenV2Guard)
  @Get()
  resetToken(
    @ReqUser() admin: admin,
    @Req() request: Request,
    @Ip() ip: string,
  ) {
    return this.authService.signToken(
      admin.id,
      ip,
      request.headers['user-agent'],
    );
  }
}
