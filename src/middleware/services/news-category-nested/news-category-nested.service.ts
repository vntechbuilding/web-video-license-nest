import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { newsCategory } from '@prisma/client';
import { from, of, switchMap, tap, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminNewsCategoryUpdateDto } from '../../../admin/admin-news-category/dto/admin-news-category.update.dto';
import { join } from 'path';
import {
  uploadContentImageDir,
  uploadContentImageThumbnailDir,
  uploadMetaImageDir,
  uploadMetaImageThumbnailDir,
} from '../../../utils/find-root-dir';
import { unlinkSync } from 'fs';

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
          return from(
            this.prisma.newsCategory.findMany({
              where: {
                domainId: newsCategory.domainId,
                rootId: newsCategory.rootId,
                left: { gte: newsCategory.left },
                right: { lte: newsCategory.right },
              },
            }),
          )
            .pipe(
              tap((listCategory) => {
                const ids = listCategory.map((category) => category.id);
                const metaImage = listCategory
                  .map((category) => category.metaImage)
                  .filter((img) => img);
                const image = listCategory
                  .map((category) => category.image)
                  .filter((img) => img);
                for (const img of metaImage) {
                  const removeFile = join(uploadMetaImageDir, img);
                  const removeThumbnailFile = join(
                    uploadMetaImageThumbnailDir,
                    img,
                  );
                  try {
                    unlinkSync(removeFile);
                    unlinkSync(removeThumbnailFile);
                  } catch (e) {}
                }
                for (const img of image) {
                  const removeFile = join(uploadContentImageDir, img);
                  const removeThumbnailFile = join(
                    uploadContentImageThumbnailDir,
                    img,
                  );
                  try {
                    unlinkSync(removeFile);
                    unlinkSync(removeThumbnailFile);
                  } catch (e) {}
                }
                // console.log(ids);
                this.prisma.url
                  .deleteMany({
                    where: {
                      domainId: newsCategory.domainId,
                      refId: {
                        in: ids,
                      },
                    },
                  })
                  .then();
              }),
            )
            .pipe(map(() => newsCategory));
        }
        return of(newsCategory);
      }),
      switchMap((newsCategory) => {
        if (newsCategory) {
          // Nếu có rootId thì cập nhật lại left và right
          return zip(
            this.prisma.newsCategory.deleteMany({
              where: {
                domainId: newsCategory.domainId,
                rootId: newsCategory.rootId,
                left: { gte: newsCategory.left },
                right: { lte: newsCategory.right },
              },
            }),
            this.prisma.news.updateMany({
              where: {
                domainId: newsCategory.domainId,
                rootId: newsCategory.rootId,
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
                    //Cập nhật lại left và right của các danh mục còn lại có left và right lớn hơn danh mục bị xóa
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
                    //Cập nhật những phần tử có left nhỏ hơn và right lớn hơn thì chỉ cần cập nhật right
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

  updateCategory(
    category: newsCategory,
    updateData: AdminNewsCategoryUpdateDto,
  ) {
    if (category && category.parentId !== updateData.parentId) {
      return from(
        this.prisma.newsCategory.findUnique({
          where: {
            id: updateData.parentId || Math.random().toString(),
            domainId: category.domainId,
            rootId: category.rootId,
            left: { gt: category.left },
            right: { lt: category.right },
          },
        }),
      ).pipe(
        switchMap((childCategory) => {
          //Childcategory là danh mục con của danh mục cần cập nhật, không chấp nhận cập nhật
          if (!childCategory) {
            return zip(
              //Đua left và right về bắt đầu từ 1
              this.prisma.newsCategory.updateMany({
                where: {
                  domainId: category.domainId,
                  rootId: category.rootId,
                  right: { lte: category.right },
                  left: { gte: category.left },
                },
                data: {
                  rootId: category.id,
                  right: {
                    decrement: category.left - 1,
                  },
                  left: {
                    decrement: category.left - 1,
                  },
                },
              }),
              this.prisma.news.updateMany({
                where: {
                  domainId: category.domainId,
                  rootId: category.rootId,
                  right: { lte: category.right },
                  left: { gte: category.left },
                },
                data: {
                  rootId: category.id,
                  right: {
                    decrement: category.left - 1,
                  },
                  left: {
                    decrement: category.left - 1,
                  },
                },
              }),
            ).pipe(
              switchMap(() =>
                zip(
                  //Cập nhật lại left và right của danh mục phía bên phải
                  this.prisma.newsCategory.updateMany({
                    where: {
                      domainId: category.domainId,
                      rootId: category.rootId,
                      right: { gt: category.right },
                      left: { gt: category.right },
                    },
                    data: {
                      left: {
                        decrement: category.right - category.left + 1,
                      },
                      right: {
                        decrement: category.right - category.left + 1,
                      },
                    },
                  }),
                  this.prisma.news.updateMany({
                    where: {
                      domainId: category.domainId,
                      rootId: category.rootId,
                      right: { gt: category.right },
                      left: { gt: category.right },
                    },
                    data: {
                      left: {
                        decrement: category.right - category.left + 1,
                      },
                      right: {
                        decrement: category.right - category.left + 1,
                      },
                    },
                  }),
                  //Cập nhật lại right của các danh mục cha
                  this.prisma.newsCategory.updateMany({
                    where: {
                      domainId: category.domainId,
                      rootId: category.rootId,
                      right: { gt: category.right },
                      left: { lt: category.left },
                    },
                    data: {
                      right: {
                        decrement: category.right - category.left + 1,
                      },
                    },
                  }),
                  this.prisma.news.updateMany({
                    where: {
                      domainId: category.domainId,
                      rootId: category.rootId,
                      right: { gt: category.right },
                      left: { lt: category.left },
                    },
                    data: {
                      right: {
                        decrement: category.right - category.left + 1,
                      },
                    },
                  }),
                ),
              ),
              switchMap(() =>
                zip(
                  this.prisma.newsCategory.findUnique({
                    where: {
                      id: updateData.parentId || Math.random().toString(),
                    },
                  }),
                  this.prisma.newsCategory.findUnique({
                    where: {
                      id: category.id,
                    },
                  }),
                ),
              ),
              switchMap(([parentCategory, updateCategory]) => {
                return zip(
                  of(parentCategory),
                  of(updateCategory),
                  parentCategory
                    ? this.prisma.newsCategory.findFirst({
                        where: {
                          domainId: parentCategory.domainId,
                          rootId: parentCategory.rootId,
                          right: { lt: parentCategory.right },
                          left: {
                            gt: parentCategory.left,
                          },
                        },
                        orderBy: {
                          right: 'desc',
                        },
                      })
                    : of(null),
                );
              }),
              // tap((data) => console.log(data)),
              switchMap(([parentCategory, updateCategory, lastCategory]) => {
                if (!updateData.parentId)
                  return this.prisma.newsCategory.update({
                    where: {
                      id: category.id,
                    },
                    data: {
                      parentId: null,
                    },
                  });

                const incrementNumber =
                  lastCategory && lastCategory.id !== parentCategory.id
                    ? lastCategory.right
                    : parentCategory.left;
                return zip(
                  this.prisma.newsCategory.update({
                    where: {
                      id: category.id,
                    },
                    data: {
                      parentId: updateData.parentId,
                    },
                  }),
                  this.prisma.newsCategory.updateMany({
                    where: {
                      domainId: category.domainId,
                      rootId: category.id,
                    },
                    data: {
                      rootId: parentCategory.rootId,
                      right: {
                        increment: incrementNumber,
                      },
                      left: {
                        increment: incrementNumber,
                      },
                    },
                  }),
                  this.prisma.news.updateMany({
                    where: {
                      domainId: category.domainId,
                      rootId: category.id,
                    },
                    data: {
                      rootId: parentCategory.rootId,
                      right: {
                        increment: incrementNumber,
                      },
                      left: {
                        increment: incrementNumber,
                      },
                    },
                  }),

                  //Cập nhật lại left và right của danh mục phía bên phải
                  this.prisma.newsCategory.updateMany({
                    where: {
                      domainId: parentCategory.domainId,
                      rootId: parentCategory.rootId,
                      right: { gt: parentCategory.right },
                      left: { gt: parentCategory.right },
                    },
                    data: {
                      left: {
                        increment: updateCategory.right,
                      },
                      right: {
                        increment: updateCategory.right,
                      },
                    },
                  }),
                  this.prisma.news.updateMany({
                    where: {
                      domainId: parentCategory.domainId,
                      rootId: parentCategory.rootId,
                      right: { gt: parentCategory.right },
                      left: { gt: parentCategory.right },
                    },
                    data: {
                      left: {
                        increment: updateCategory.right,
                      },
                      right: {
                        increment: updateCategory.right,
                      },
                    },
                  }),
                  //Cập nhật lại right của các danh mục cha
                  this.prisma.newsCategory.updateMany({
                    where: {
                      domainId: parentCategory.domainId,
                      rootId: parentCategory.rootId,
                      right: { gte: parentCategory.right },
                      left: { lte: parentCategory.left },
                    },
                    data: {
                      right: {
                        increment: updateCategory.right,
                      },
                    },
                  }),
                  this.prisma.news.updateMany({
                    where: {
                      domainId: parentCategory.domainId,
                      rootId: parentCategory.rootId,
                      right: { gte: parentCategory.right },
                      left: { lte: parentCategory.left },
                    },
                    data: {
                      right: {
                        increment: updateCategory.right,
                      },
                    },
                  }),
                );
              }),
            );
          } else {
            return of(false);
          }
        }),
      );
    } else {
      //TODO cập nhật lại thông tin danh mục con của danh mục được cập nhật, vả danh mục cha trước đó.
    }

    return of(category);
  }

  createCategory(category: newsCategory & { parent: newsCategory }) {
    if (category && category.parent) {
      return zip(
        this.prisma.newsCategory.updateMany({
          where: {
            domainId: category.domainId,
            rootId: category.parent.rootId,
            right: { gt: category.parent.right },
            left: { gt: category.parent.right },
          },
          data: {
            left: { increment: 2 },
            right: { increment: 2 },
          },
        }),
        this.prisma.newsCategory.updateMany({
          where: {
            domainId: category.domainId,
            rootId: category.parent.rootId,
            right: { gte: category.parent.right }, //Có right lớn hơn parent.right
            left: { lte: category.parent.left }, //Và left nhỏ hơn parent.left
          },
          data: {
            right: { increment: 2 },
          },
        }),
        this.prisma.news.updateMany({
          where: {
            domainId: category.domainId,
            rootId: category.parent.rootId,
            right: { gte: category.parent.right }, //Có right lớn hơn parent.right
            left: { lte: category.parent.left }, //Và left nhỏ hơn parent.left
          },
          data: {
            right: { increment: 2 },
          },
        }),
        this.prisma.news.updateMany({
          where: {
            domainId: category.domainId,
            rootId: category.parent.rootId,
            right: { gt: category.parent.right },
            left: { gt: category.parent.right },
          },
          data: {
            left: { increment: 2 },
            right: { increment: 2 },
          },
        }),
      ).pipe(
        // tap((data) => console.log(data, category.parent)),
        switchMap(() =>
          this.prisma.newsCategory.findUnique({
            where: {
              id: category.parentId,
            },
          }),
        ),
        switchMap((parentData) =>
          this.prisma.newsCategory.findFirst({
            where: {
              domainId: parentData.domainId,
              rootId: parentData.rootId,
              right: { lt: parentData.right },
              left: {
                gt: parentData.left,
              },
            },
            orderBy: {
              right: 'desc',
            },
          }),
        ),
        // tap((data) => console.log(data)),
        switchMap((lastCategory) => {
          const incrementNumber = lastCategory
            ? lastCategory.right
            : category.parent.left;
          return this.prisma.newsCategory.update({
            where: {
              id: category.id,
            },
            data: {
              left: incrementNumber + 1,
              right: incrementNumber + 2,
              rootId: category.parent.rootId,
            },
          });
        }),
      );
    }
    return this.prisma.newsCategory.update({
      where: {
        id: category.id,
      },
      data: {
        rootId: category.id,
      },
    });
  }
}
