import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { PageMaxDto } from '../../middleware/dto/page-max.dto';
import { from, of, switchMap, zip } from 'rxjs';
import { AdminNewsCreateDto } from './dto/admin-news.create.dto';
import { AdminNewsEditDto } from './dto/admin-news.edit.dto';
import { omit } from 'lodash';
import { join } from 'path';
import {
  uploadMetaImageDir,
  uploadMetaImageThumbnailDir,
} from '../../utils/find-root-dir';
import { news } from '@prisma/client';
import { unlinkSync } from 'fs';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminNewsService {
  constructor(private prisma: PrismaService) {}
  getAllNews(pageData: PageMaxDto) {
    return this.prisma.findManyAndCount('news', {
      take: pageData.perPage,
      skip: pageData.page * pageData.perPage,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        domain: {
          include: {
            user: true,
          },
        },
        author: true,
        publisher: true,
        category: true,
        video: true,
      },
    });
  }

  getAllUserNews(userId: string, pageData: PageMaxDto) {
    return this.prisma.findManyAndCount(
      'news',
      {
        take: pageData.perPage,
        skip: pageData.page * pageData.perPage,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          domain: {
            include: {
              user: true,
            },
          },
          author: true,
          publisher: true,
          category: true,
          video: true,
        },
      },
      {
        domain: {
          userId: userId,
        },
      },
    );
  }

  getAllDomainNews(domainId: string, pageData: PageMaxDto) {
    return this.prisma.findManyAndCount(
      'news',
      {
        take: pageData.perPage,
        skip: pageData.page * pageData.perPage,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          domain: {
            include: {
              user: true,
            },
          },
          author: true,
          publisher: true,
          category: true,
          video: true,
        },
      },
      {
        domainId: domainId,
      },
    );
  }

  getAllCategoryNews(categoryId: string, pageData: PageMaxDto) {
    return from(
      this.prisma.newsCategory.findUnique({
        where: {
          id: categoryId,
        },
      }),
    ).pipe(
      switchMap((newsCategory) => {
        if (!newsCategory) return of(this.prisma.defaultManyAndCountResult);
        return this.prisma.findManyAndCount(
          'news',
          {
            take: pageData.perPage,
            skip: pageData.page * pageData.perPage,
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              domain: {
                include: {
                  user: true,
                },
              },
              author: true,
              publisher: true,
              category: true,
              video: true,
            },
          },
          {
            domainId: newsCategory.domainId,
            rootId: newsCategory.rootId,
            right: {
              lte: newsCategory.right,
            },
            left: {
              gte: newsCategory.left,
            },
          },
        );
      }),
    );
  }

  createNews(createData: AdminNewsCreateDto) {
    return from(
      this.prisma.newsCategory.findUnique({
        where: {
          id: createData.categoryId,
        },
      }),
    ).pipe(
      switchMap((newsCategory) => {
        if (newsCategory) {
          return from(
            this.prisma.news.create({
              data: {
                ...createData,
                left: newsCategory.left,
                right: newsCategory.right,
                rootId: newsCategory.rootId,
              },
            }),
          ).pipe(
            switchMap((news) => {
              if (news) {
                return this.prisma
                  .updateUrl('news', news.id, 'NEWS')
                  .pipe(map(() => news));
              }
              return of(news);
            }),
          );
        } else {
          return of(false);
        }
      }),
    );
  }

  updateNews(updateData: AdminNewsEditDto) {
    return from(
      this.prisma.newsCategory.findUnique({
        where: {
          id: updateData.categoryId,
        },
      }),
    ).pipe(
      switchMap((newsCategory) => {
        if (newsCategory) {
          return from(
            this.prisma.news.update({
              where: {
                id: updateData.newsId,
              },
              data: {
                ...omit(updateData, 'newsId'),
                left: newsCategory.left,
                right: newsCategory.right,
                rootId: newsCategory.rootId,
              },
            }),
          ).pipe(
            switchMap((news) => {
              if (news) {
                return this.prisma
                  .updateUrl('news', news.id, 'NEWS')
                  .pipe(map(() => news));
              }
              return of(news);
            }),
          );
        } else {
          return of(false);
        }
      }),
    );
  }
  deleteNews(newsId: string) {
    return from(
      this.prisma.news.findUnique({
        where: {
          id: newsId,
        },
      }),
    ).pipe(
      switchMap((oldNews) => {
        if (!oldNews) return of(false);
        this.deleteNewsFile(oldNews);
        return zip(
          this.prisma.news.delete({
            where: {
              id: newsId,
            },
          }),
          this.prisma.deleteUrl({
            domainId: oldNews.domainId,
            refId: oldNews.id,
          }),
        );
      }),
    );
  }

  deleteNewsFile(news: news) {
    const imagePath = join(uploadMetaImageDir, news.image);
    const imageThumbnailPath = join(uploadMetaImageThumbnailDir, news.image);
    const metaImagePath = join(uploadMetaImageDir, news.metaImage);
    const metaImageThumbnailPath = join(
      uploadMetaImageThumbnailDir,
      news.metaImage,
    );
    try {
      unlinkSync(imagePath);
      unlinkSync(imageThumbnailPath);
    } catch (e) {}
    try {
      unlinkSync(metaImagePath);
      unlinkSync(metaImageThumbnailPath);
    } catch (e) {}
  }
}
