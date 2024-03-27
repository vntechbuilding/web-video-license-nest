import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminV2Guard } from '../../middleware/guard/admin-v2/admin-v2.guard';
import { AdminVideoService } from './admin-video.service';
import { PageMaxDto } from '../../middleware/dto/page-max.dto';
import { UserIdDto } from '../../middleware/dto/user-id.dto';
import { AdminVideoCreateDto } from './dto/admin-video.create.dto';
import { AdminVideoUpdateDto } from './dto/admin-video.update.dto';
import { VideoIdDto } from '../../middleware/dto/video-id.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Mp4MulterOptions } from '../../utils/mp4-multer-options';
import { CleanupInterceptor } from '../../middleware/interceptors/cleanup-interceptor';
import { utimes } from 'fs/promises';

@Controller('api/admin/video')
@UseGuards(AdminV2Guard)
export class AdminVideoController {
  constructor(private videoService: AdminVideoService) {}

  @Get()
  getAllVideo(@Query() page: PageMaxDto) {
    return this.videoService.getAllVideo(page);
  }

  @Get('user/:userId')
  getAllUserVideo(@Query() page: PageMaxDto, @Param() userId: UserIdDto) {
    return this.videoService.getAllUserVideo(userId.userId, page);
  }
  //@UseInterceptors(FileInterceptor
  @Post()
  @UseInterceptors(
    FileInterceptor('file', Mp4MulterOptions()),
    CleanupInterceptor,
  )
  async createVideo(
    @Body() createData: AdminVideoCreateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log({ createData, file });
    // // return { createData, file };
    const uploadDate = createData.uploadDate || new Date().toString();
    const newModifiedTime = new Date(
      new Date(uploadDate).getTime() -
        Math.floor(Math.random() * 60 * 60 * 24 * 10 * 1000),
    );
    // console.log(newModifiedTime);
    await utimes(file.path, newModifiedTime, newModifiedTime);
    return this.videoService.createVideo({
      ...createData,
      file: file.filename,
    });
  }

  @Put()
  updateVideo(@Body() updateData: AdminVideoUpdateDto) {
    return this.videoService.updateVideo(updateData);
  }
  @Delete(':videoId')
  deleteVideo(@Param() videoId: VideoIdDto) {
    return this.videoService.deleteVideo(videoId.videoId);
  }
}
