import { Module } from '@nestjs/common';
import { ApiV1Module } from './api/api-v1/api-v1.module';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { GlobalModule } from './middleware/global/global.module';
import { findRootDir } from './utils/find-root-dir';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { NewsCategoryNestedService } from './middleware/services/news-category-nested/news-category-nested.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(findRootDir(), 'assets'),
      serveRoot: '/',
    }),
    GlobalModule,
    ApiV1Module,
    AdminModule,
  ],
  controllers: [],
  providers: [NewsCategoryNestedService],
})
export class AppModule {}
