import { Module } from '@nestjs/common';
import { AdminPublisherController } from './admin-publisher.controller';
import { AdminPublisherService } from './admin-publisher.service';

@Module({
  controllers: [AdminPublisherController],
  providers: [AdminPublisherService]
})
export class AdminPublisherModule {}
