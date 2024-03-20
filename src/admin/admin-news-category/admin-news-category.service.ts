import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { from, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { newsCategory } from '@prisma/client';
import { clone } from 'lodash';
import { AdminNewsCategoryCreateDto } from './dto/admin-news-category.create.dto';
import { NewsCategoryNestedService } from '../../middleware/services/news-category-nested/news-category-nested.service';

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
          domain: true,
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
          domain: true,
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
        this.newsCategoryNested.createCategory(newsCategory),
      ),
    );
  }

  deleteNewsCategory(categoryId: string) {
    return this.newsCategoryNested.deleteCategory(categoryId);
  }
}
