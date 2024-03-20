import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { newsCategory } from '@prisma/client';
import { from, of, switchMap, tap, zip } from 'rxjs';
import { map } from 'rxjs/operators';

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
                left: { gt: newsCategory.left },
                right: { lt: newsCategory.right },
              },
            }),
            this.prisma.newsCategory.delete({
              where: {
                id: newsCategory.id,
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
                  //TODO lỗi ở đây, cần chỉnh lại cập nhật left bị sai
                  this.prisma.newsCategory.updateMany({
                    where: {
                      domainId: newsCategory.domainId,
                      rootId: newsCategory.rootId,
                      left: { gt: newsCategory.right },
                      right: { gt: newsCategory.right },
                    },
                    data: {
                      left: { decrement: updateRange },
                      right: { decrement: updateRange },
                    },
                  }),
                  this.prisma.newsCategory.updateMany({
                    where: {
                      domainId: newsCategory.domainId,
                      rootId: newsCategory.rootId,
                      left: { lt: newsCategory.left },
                      right: { gt: newsCategory.right },
                    },
                    data: {
                      // left: { decrement: updateRange },
                      right: { decrement: updateRange },
                    },
                  }),
                  this.prisma.newsCategory.updateMany({
                    where: {
                      id: newsCategory.rootId || Math.random().toString(),
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
                      right: { gt: newsCategory.right },
                    },
                    data: {
                      left: { decrement: updateRange },
                      right: { decrement: updateRange },
                    },
                  }),
                  this.prisma.news.updateMany({
                    where: {
                      domainId: newsCategory.domainId,
                      rootId: newsCategory.rootId,
                      left: { lt: newsCategory.left },
                      right: { gt: newsCategory.right },
                    },
                    data: {
                      right: { decrement: updateRange },
                    },
                  }),
                  this.prisma.news.updateMany({
                    where: {
                      domainId: newsCategory.domainId,
                      categoryId:
                        newsCategory.rootId || Math.random().toString(),
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
            rootId:
              category.parent.rootId ||
              category.parent.id ||
              Math.random().toString(),
            // right: { lt: category.parent.right },
            left: { gt: category.parent.left }, //Có left lớn hơn parent.left
          },
          data: {
            left: { increment: 2 },
            right: { increment: 2 },
          },
        }),
        this.prisma.newsCategory.updateMany({
          where: {
            domainId: category.domainId,
            rootId:
              category.parent.rootId ||
              category.parent.id ||
              Math.random().toString(),
            // right: { lt: category.parent.right },
            right: { gt: category.parent.right }, //Có right lớn hơn parent.right
            left: { lt: category.parent.left }, //Và left nhỏ hơn parent.left
            id: {
              not: category.parentId,
            },
          },
          data: {
            right: { increment: 2 },
          },
        }),
        this.prisma.news.updateMany({
          where: {
            domainId: category.domainId,
            rootId:
              category.parent.rootId ||
              category.parent.id ||
              Math.random().toString(),
            right: { gt: category.parent.right },
            categoryId: {
              not: category.parentId,
            },
          },
          data: {
            right: { increment: 2 },
          },
        }),
        this.prisma.news.updateMany({
          where: {
            domainId: category.domainId,
            rootId:
              category.parent.rootId ||
              category.parent.id ||
              Math.random().toString(),
            left: { gt: category.parent.left },
          },
          data: {
            left: { increment: 2 },
            right: { increment: 2 },
          },
        }),
      )
        .pipe(
          // tap((data) => console.log(data)),
          switchMap(() =>
            zip(
              this.prisma.newsCategory.update({
                //Done
                where: {
                  id: category.parentId,
                },
                data: {
                  right: { increment: 2 },
                },
              }),
              this.prisma.news.updateMany({
                where: {
                  domainId: category.domainId,
                  categoryId: category.parentId,
                },
                data: {
                  right: { increment: 2 },
                },
              }),
            ),
          ),
          switchMap(() => {
            if (category.parent.rootId)
              return this.prisma.newsCategory.updateMany({
                where: {
                  id: category.parent.rootId,
                },
                data: {
                  right: { increment: 2 },
                },
              });
            return of(category);
          }),
        )
        .pipe(
          map(() =>
            this.prisma.newsCategory.update({
              where: {
                id: category.id,
              },
              data: {
                left: category.parent.left + 1,
                right: category.parent.left + 2,
                rootId: category.parent.rootId || category.parent.id,
              },
            }),
          ),
        );
    }
    return of(category);
  }
}
