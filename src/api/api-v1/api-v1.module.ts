import { Module } from '@nestjs/common';
import { ApiV1AuthModule } from './api-v1-auth/api-v1-auth.module';

@Module({
  imports: [ApiV1AuthModule],
  exports: [],
})
export class ApiV1Module {}
