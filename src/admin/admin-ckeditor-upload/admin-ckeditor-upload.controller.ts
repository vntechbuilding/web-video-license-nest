import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminV2Guard } from '../../middleware/guard/admin-v2/admin-v2.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CleanupInterceptor } from '../../middleware/interceptors/cleanup-interceptor';
import { ImageMulterOptions } from '../../utils/image-multer-options';
import { ckeditorUploadUrl } from '../../utils/find-root-dir';

@Controller('api/admin/ckeditor-upload')
@UseGuards(AdminV2Guard)
export class AdminCkeditorUploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', ImageMulterOptions()),
    CleanupInterceptor,
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return { url: ckeditorUploadUrl + file.filename };
  }
}
