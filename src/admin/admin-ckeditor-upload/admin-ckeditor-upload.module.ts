import { Module } from '@nestjs/common';
import { AdminCkeditorUploadController } from './admin-ckeditor-upload.controller';

@Module({
  controllers: [AdminCkeditorUploadController]
})
export class AdminCkeditorUploadModule {}
