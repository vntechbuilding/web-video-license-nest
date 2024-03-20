import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ValidatorModule } from '../validator/validator.module';
import { HttpModule } from '@nestjs/axios';
import { SesNodemailerService } from '../services/ses-nodemailer/ses-nodemailer.service';
import { ApiV1Services } from '../../admin/api-v1-services';
import { BullRegister } from '../../bull.config';
import { BullModule } from '@nestjs/bull';
import { SendUserForgotPasswordConsumer } from '../../bull-consumer/send-user-forgot-password.consumer';
import { AdminAuthService } from '../../admin/admin-auth/admin-auth.service';
import { ApiV1AuthService } from '../../api/api-v1/api-v1-auth/api-v1-auth.service';
import { UserService } from '../../admin/user/user.service';
import { NewsCategoryNestedService } from '../services/news-category-nested/news-category-nested.service';

export const globalConsumer = [SendUserForgotPasswordConsumer];
export const globalServiceQueue = [UserService];
export const globalGuard = [];
export const globalAuthService = [ApiV1AuthService, AdminAuthService];
export const globalService = [SesNodemailerService, NewsCategoryNestedService];
@Global()
@Module({
  providers: [
    PrismaService,
    ...globalAuthService,
    ...globalServiceQueue,
    ...globalGuard,
    ...globalConsumer,
    ...globalService,
    ...ApiV1Services,
  ],
  imports: [
    ConfigModule,
    HttpModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        // signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ValidatorModule,

    BullModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          redis: {
            host: config.get('REDIS_HOST'),
            port: parseInt(config.get('REDIS_PORT')),
            password: config.get('REDIS_PASS'),
          },
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ...BullRegister,
  ],
  exports: [
    PrismaService,
    JwtModule,
    ValidatorModule,
    ...globalAuthService,
    ...globalServiceQueue,
    ...globalGuard,
    ...globalService,
  ],
})
export class GlobalModule {}
