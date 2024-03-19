import {
  Body,
  Controller,
  Get,
  Ip,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiV1AuthService } from './api-v1-auth.service';
import { ReqParseAuthToken } from '../../../middleware/decorator/req-parse-auth-token/req-parse-auth-token.decorator';
import { ReqUser } from '../../../middleware/decorator/req-user/req-user.decorator';
import { user } from '@prisma/client';
import { UserAuthLoginDto } from './dto/user-auth-login.dto';
import { UserAuthRegisterDto } from './dto/user-auth-register.dto';
import { UserAuthForgotPasswordDto } from './dto/user-auth-forgot-password.dto';
import { map, switchMap } from 'rxjs';
import { UserAuthResetPasswordDto } from './dto/user-auth-reset-password.dto';
import { UserGuard } from '../../../middleware/guard/user/user.guard';
import { UserRefreshTokenGuard } from '../../../middleware/guard/user-refresh-token/user-refresh-token.guard';

@Controller('api/v1/auth')
export class ApiV1AuthController {
  constructor(private authService: ApiV1AuthService) {}

  @Post('register')
  register(
    @Body() registerData: UserAuthRegisterDto,
    @Req() request: Request,
    @Ip() ip: string,
  ) {
    return this.authService.register(
      registerData,
      ip,
      request.headers['user-agent'],
    );
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordData: UserAuthForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordData.email).pipe(
      map(() => {
        return { success: true };
      }),
    );
  }

  @Post('reset-password')
  resetPassword(
    @Body() resetData: UserAuthResetPasswordDto,
    @Req() request: Request,
    @Ip() ip: string,
  ) {
    return this.authService.resetPassword(
      resetData,
      ip,
      request.headers['user-agent'],
    );
  }

  @Post()
  doLogin(
    @Body() loginData: UserAuthLoginDto,
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
  @UseGuards(UserRefreshTokenGuard)
  @Get('logout')
  logout(@ReqParseAuthToken() token: string) {
    return this.authService.logout(token).pipe(map(() => true));
  }
  @UseGuards(UserGuard)
  @Get('check-token')
  checkToken() {
    return 'true';
  }

  @UseGuards(UserRefreshTokenGuard)
  @Put('reset-token')
  resetToken(
    @ReqUser() user: user,
    @Req() request: Request,
    @Ip() ip: string,
    @ReqParseAuthToken() token: string,
  ) {
    return this.authService.logout(token).pipe(
      switchMap((logoutData) => {
        // console.log('resetToken', logoutData);
        return this.authService.signToken(
          user.id,
          ip,
          request.headers['user-agent'],
          typeof logoutData === 'object' ? logoutData.createdAt : new Date(),
          typeof logoutData === 'object' ? logoutData.id : '',
        );
      }),
    );
  }
}
