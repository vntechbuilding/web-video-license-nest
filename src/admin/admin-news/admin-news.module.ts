import { Module } from '@nestjs/common';
import { AdminNewsController } from './admin-news.controller';
import { AdminNewsService } from './admin-news.service';

@Module({
  controllers: [AdminNewsController],
  providers: [AdminNewsService]
})
export class AdminNewsModule {}
