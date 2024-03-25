import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { PageMaxDto } from '../../middleware/dto/page-max.dto';
import { AdminPageCreateDto } from './dto/admin-page.create.dto';
import { AdminPageEditDto } from './dto/admin-page.edit.dto';
import { omit } from 'lodash';
import { from, of, switchMap, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Delete16x9Image } from '../../utils/delete-16x9-image';
export const adminPageInclude = {
  include: {
    domain: {
      include: {
        user: true,
      },
    },
    author: true,
    publisher: true,
    video: true,
  },
};

@Injectable()
export class AdminPageService {
  constructor(private prisma: PrismaService) {}

  getAllPage(pageData: PageMaxDto) {
    return this.prisma.findManyAndCount<'page'>('page', {
      take: pageData.perPage,
      skip: pageData.page * pageData.perPage,
      orderBy: {
        createdAt: 'desc',
      },
      ...adminPageInclude,
    });
  }

  getAllUserPage(userId: string, pageData: PageMaxDto) {
    return this.prisma.findManyAndCount(
      'page',
      {
        take: pageData.perPage,
        skip: pageData.page * pageData.perPage,
        orderBy: {
          createdAt: 'desc',
        },
        ...adminPageInclude,
      },
      {
        domain: {
          userId: userId,
        },
      },
    );
  }

  getAllDomainPage(domainId: string, pageData: PageMaxDto) {
    return this.prisma.findManyAndCount(
      'page',
      {
        take: pageData.perPage,
        skip: pageData.page * pageData.perPage,
        orderBy: {
          createdAt: 'desc',
        },
        ...adminPageInclude,
      },
      {
        domainId: domainId,
      },
    );
  }

  createPage(createData: AdminPageCreateDto) {
    return from(
      this.prisma.page.create({
        data: createData,
      }),
    ).pipe(
      switchMap((page) => {
        if (page) {
          return this.prisma
            .updateUrl('page', page.id, 'PAGE')
            .pipe(map(() => page));
        }
        return of(page);
      }),
    );
  }

  updatePage(updateData: AdminPageEditDto) {
    return from(
      this.prisma.page.update({
        where: {
          id: updateData.pageId,
        },
        data: omit(updateData, 'pageId'),
      }),
    ).pipe(
      switchMap((page) => {
        if (page) {
          return this.prisma
            .updateUrl('page', page.id, 'PAGE')
            .pipe(map(() => page));
        }
        return of(page);
      }),
    );
  }

  deletePage(pageId: string) {
    return from(
      this.prisma.page.findUnique({
        where: {
          id: pageId,
        },
      }),
    ).pipe(
      switchMap((oldPage) => {
        if (!oldPage) return of(false);
        Delete16x9Image(oldPage);
        return zip(
          this.prisma.page.delete({
            where: {
              id: pageId,
            },
          }),
          this.prisma.deleteUrl({
            domainId: oldPage.domainId,
            refId: oldPage.id,
          }),
        );
      }),
    );
  }
}
