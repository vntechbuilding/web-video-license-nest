import { Module } from '@nestjs/common';
import { AdminTemplateDataController } from './admin-template-data.controller';
import { AdminTemplateDataService } from './admin-template-data.service';

@Module({
  controllers: [AdminTemplateDataController],
  providers: [AdminTemplateDataService]
})
export class AdminTemplateDataModule {}
