import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { newsCategory } from '@prisma/client';
import { from, of, switchMap, zip } from 'rxjs';

@Injectable()
export class NewsCategoryNestedService {
  constructor(private prisma: PrismaService) {}

  deleteCategory(categoryId: string) {
    return from(
      this.prisma.newsCategory.findUnique({
        where: {
          id: categoryId,
        },
      }),
    ).pipe(
      switchMap((newsCategory) => {
        if (newsCategory) {
          // Nếu có rootId thì cập nhật lại left và right
          return zip(
            this.prisma.newsCategory.deleteMany({
              where: {
                domainId: newsCategory.domainId,
                rootId: newsCategory.rootId || newsCategory.id,
                left: { gte: newsCategory.left },
                right: { lte: newsCategory.right },
              },
            }),
            this.prisma.news.updateMany({
              where: {
                domainId: newsCategory.domainId,
                rootId: newsCategory.rootId || newsCategory.id,
                left: { gte: newsCategory.left },
                right: { lte: newsCategory.right },
              },
              data: {
                categoryId: null,
                rootId: null,
                left: 0,
                right: 0,
              },
            }),
          ).pipe(
            switchMap(() => {
              if (newsCategory.rootId) {
                const updateRange = newsCategory.right - newsCategory.left + 1;
                return zip(
                  this.prisma.newsCategory.updateMany({
                    where: {
                      domainId: newsCategory.domainId,
                      rootId: newsCategory.rootId,
                      left: { gt: newsCategory.right },
                    },
                    data: {
                      left: { decrement: updateRange },
                      right: { decrement: updateRange },
                    },
                  }),
                  this.prisma.newsCategory.update({
                    where: {
                      id: newsCategory.parrentId,
                    },
                    data: {
                      right: { decrement: updateRange },
                    },
                  }),
                  this.prisma.news.updateMany({
                    where: {
                      domainId: newsCategory.domainId,
                      rootId: newsCategory.rootId,
                      left: { gt: newsCategory.right },
                    },
                    data: {
                      left: { decrement: updateRange },
                      right: { decrement: updateRange },
                    },
                  }),
                  this.prisma.news.updateMany({
                    where: {
                      domainId: newsCategory.domainId,
                      categoryId: newsCategory.parrentId,
                    },
                    data: {
                      right: { decrement: updateRange },
                    },
                  }),
                );
              }
              return of(newsCategory);
            }),
          );
        }
        return of(true);
      }),
    );
  }

  createCategory(category: newsCategory & { parent: newsCategory }) {
    if (category && category.parent) {
      return zip(
        this.prisma.newsCategory.updateMany({
          where: {
            domainId: category.domainId,
            rootId: category.rootId || category.id,
            left: { gte: category.parent.right },
          },
          data: {
            left: { increment: 2 },
            right: { increment: 2 },
          },
        }),
        this.prisma.news.updateMany({
          where: {
            domainId: category.domainId,
            rootId: category.rootId || category.id,
            left: { gte: category.parent.right },
          },
          data: {
            left: { increment: 2 },
            right: { increment: 2 },
          },
        }),
        this.prisma.newsCategory.update({
          where: {
            id: category.parrentId,
          },
          data: {
            right: { increment: 2 },
          },
        }),
        this.prisma.news.updateMany({
          where: {
            domainId: category.domainId,
            categoryId: category.parrentId,
          },
          data: {
            right: { increment: 2 },
          },
        }),
        this.prisma.newsCategory.update({
          where: {
            id: category.id,
          },
          data: {
            left: category.parent.left + 1,
            right: category.parent.left + 2,
          },
        }),
      );
    }
    return of(category);
  }
}
