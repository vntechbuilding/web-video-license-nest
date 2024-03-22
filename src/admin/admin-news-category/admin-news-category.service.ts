import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { from, switchMap, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { newsCategory } from '@prisma/client';
import { clone, omit } from 'lodash';
import { AdminNewsCategoryCreateDto } from './dto/admin-news-category.create.dto';
import { NewsCategoryNestedService } from '../../middleware/services/news-category-nested/news-category-nested.service';
import { AdminNewsCategoryUpdateDto } from './dto/admin-news-category.update.dto';

@Injectable()
export class AdminNewsCategoryService {
  constructor(
    private prisma: PrismaService,
    private newsCategoryNested: NewsCategoryNestedService,
  ) {}
  getCategory() {
    return from(
      this.prisma.newsCategory.findMany({
        include: {
          domain: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      }),
    ).pipe(
      map((listCategory) => {
        return listCategory
          .filter((category) => category.parentId === null)
          .map((root) => this.findChild(root, listCategory));
      }),
    );
  }

  getCategoryDomain(domainId: string) {
    return from(
      this.prisma.newsCategory.findMany({
        where: {
          domainId: domainId,
        },
        include: {
          domain: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      }),
    ).pipe(
      map((listCategory) => {
        return listCategory
          .filter((category) => category.parentId === null)
          .map((root) => this.findChild(root, listCategory));
      }),
    );
  }

  getCategoryUser(userId: string) {
    return from(
      this.prisma.newsCategory.findMany({
        where: {
          domain: {
            userId: userId,
          },
        },
        include: {
          domain: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      }),
    ).pipe(
      map((listCategory) => {
        return listCategory
          .filter((category) => category.parentId === null)
          .map((root) => this.findChild(root, listCategory));
      }),
    );
  }

  findChild(root: newsCategory, listCategory: Array<newsCategory>) {
    const rs = {
      ...clone(root),
      children: listCategory
        .filter((category) => category.parentId === root.id)
        .map((child) => this.findChild(child, listCategory)),
    };

    return rs;
  }

  updateNewsCategory(updateData: AdminNewsCategoryUpdateDto) {
    return from(
      this.prisma.newsCategory.update({
        where: {
          id: updateData.categoryId,
        },
        include: {
          parent: true,
        },
        data: omit(updateData, 'categoryId', 'parentId'),
      }),
    ).pipe(
      switchMap((newsCategory) =>
        zip(
          this.newsCategoryNested.updateCategory(newsCategory, updateData),
          this.prisma.updateUrl(
            'newsCategory',
            newsCategory.id,
            'NEWSCATEGORY',
          ),
        ),
      ),
    );
  }

  createNewsCategory(createData: AdminNewsCategoryCreateDto) {
    return from(
      this.prisma.newsCategory.create({
        data: createData,
        include: {
          parent: true,
        },
      }),
    ).pipe(
      switchMap((newsCategory) =>
        zip(
          this.newsCategoryNested.createCategory(newsCategory),
          this.prisma.updateUrl(
            'newsCategory',
            newsCategory.id,
            'NEWSCATEGORY',
          ),
        ),
      ),
    );
  }

  deleteNewsCategory(categoryId: string) {
    return this.newsCategoryNested.deleteCategory(categoryId);
  }
}
