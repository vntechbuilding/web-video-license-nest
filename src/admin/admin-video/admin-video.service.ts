import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { PageMaxDto } from '../../middleware/dto/page-max.dto';
import { AdminVideoCreateDto } from './dto/admin-video.create.dto';
import { AdminVideoUpdateDto } from './dto/admin-video.update.dto';
import { omit } from 'lodash';
import { from, switchMap } from 'rxjs';
import { join } from 'path';
import {
  uploadMetaImageDir,
  uploadMetaImageThumbnailDir,
} from '../../utils/find-root-dir';
import { unlinkSync } from 'fs';
import { videoFolder } from '../../constants';

@Injectable()
export class AdminVideoService {
  constructor(private prisma: PrismaService) {}

  getAllVideo(pageData: PageMaxDto) {
    return this.prisma.findManyAndCount('video', {
      take: pageData.perPage,
      skip: pageData.page * pageData.perPage,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });
  }

  getAllUserVideo(userId: string, pageData: PageMaxDto) {
    return this.prisma.findManyAndCount(
      'video',
      {
        take: pageData.perPage,
        skip: pageData.page * pageData.perPage,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
        },
      },
      {
        userId: userId,
      },
    );
  }

  createVideo(createData: AdminVideoCreateDto) {
    return this.prisma.video.create({
      data: createData,
    });
  }

  updateVideo(updateData: AdminVideoUpdateDto) {
    return this.prisma.video.update({
      where: {
        id: updateData.videoId,
      },
      data: {
        ...omit(updateData, 'videoId'),
      },
    });
  }

  deleteVideo(videoId: string) {
    //TODO delete mp4 file, image file
    return from(
      this.prisma.video.findUnique({
        where: {
          id: videoId,
        },
      }),
    ).pipe(
      switchMap((oldVideo) => {
        const filePath = join(uploadMetaImageDir, oldVideo.thumbnail);
        const fileThumbnailPath = join(
          uploadMetaImageThumbnailDir,
          oldVideo.thumbnail,
        );
        const videoFile = join(videoFolder, oldVideo.file);
        try {
          if (oldVideo.file) {
            unlinkSync(videoFile);
          }
        } catch (e) {}
        try {
          unlinkSync(filePath);
          unlinkSync(fileThumbnailPath);
        } catch (e) {}
        return this.prisma.video.delete({
          where: {
            id: videoId,
          },
        });
      }),
    );
  }
}
