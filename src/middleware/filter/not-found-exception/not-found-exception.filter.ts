import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import * as moment from 'moment';
import { Request, Response } from 'express';
import { resolve } from 'path';
import { existsSync } from 'fs';
import {
  defaultImageTemplateDir,
  findRootDir,
  uploadMetaImageThumbnailUrl,
  uploadMetaImageUrl,
  uploadVideoUrl,
} from '../../../utils/find-root-dir';
import { PrismaService } from '../../prisma/prisma.service';
import { domain, template, newsCategory } from '@prisma/client';
import { templateFolder } from '../../../constants';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';
import { DomainTemplateService } from '../../services/domain-template/domain-template.service';
import { firstValueFrom } from 'rxjs';
import { generateBreadcrumbList } from '../../../utils/generate-news-category-breadcrumb';
@Catch(NotFoundException)
export class NotFoundExceptionFilter<T> implements ExceptionFilter {
  private rootDir = findRootDir();
  constructor(
    private readonly prismaService: PrismaService,
    private readonly domainTemplateService: DomainTemplateService,
  ) {}
  async catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();
    const url = request.originalUrl;
    const urlSplit = url.split('/');
    const hostname = request.hostname;
    const domain = await this.prismaService.domain.findUnique({
      where: {
        domain: hostname,
      },
      include: {
        template: true,
      },
    });
    if (domain && domain.template && domain.template.id) {
      if (urlSplit[1]) {
        const urlDb = await this.prismaService.url.findUnique({
          where: {
            domainId_url: {
              domainId: domain.id,
              url: urlSplit[1],
            },
          },
        });
        // console.log(urlDb);
        if (urlDb) {
          if (urlDb.type === 'NEWS') {
            await this.showNews(urlDb.refId, domain, request, response);
          } else if (urlDb.type === 'NEWSCATEGORY') {
            await this.showNewsCategory(urlDb.refId, domain, request, response);
          } else if (urlDb.type === 'PAGE') {
            await this.showPage(urlDb.refId, domain, request, response);
          } else {
            await this.showDomain404(domain, request, response);
          }
          // return response.json(urlDb);
        } else {
          await this.showDomain404(domain, request, response);
        }
      } else {
        await this.showHomePage(domain, request, response);
      }
    } else this.checkIndex(request, response);
  }

  async getNewsCategoryBreadcrumb(
    newsCategory: newsCategory & { parent: newsCategory },
  ) {
    if (newsCategory.parentId) {
      const parent: any = await this.prismaService.newsCategory.findUnique({
        where: {
          id: newsCategory.parentId,
        },
      });
      newsCategory.parent = await this.getNewsCategoryBreadcrumb(parent);
      // newsCategory.parent = parent;
    }
    return newsCategory;
  }

  async showPage(
    refId: string,
    domain: domain & { template: template },
    request: Request,
    response: Response,
  ) {
    if (fileExistsSync(this.templateEjsPath(domain) + '/page.ejs')) {
      const page = await this.prismaService.page.findUnique({
        where: {
          id: refId,
        },
        include: {
          author: true,
          publisher: true,
          video: true,
        },
      });
      if (page) {
        const defaultConfig = await this.getTemplateDefaultData(
          domain,
          request,
        );

        const newsSchema: any = {
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: page.title,
          image: [
            defaultConfig.domainUrl +
              defaultConfig.uploadMetaImageThumbnailUrl +
              page.image,
            defaultConfig.domainUrl +
              defaultConfig.uploadMetaImageUrl +
              page.image,
            defaultConfig.domainUrl +
              defaultConfig.uploadMetaImageThumbnailUrl +
              page.metaImage,
            defaultConfig.domainUrl +
              defaultConfig.uploadMetaImageUrl +
              page.metaImage,
          ],
          datePublished: page.uploadDate.toISOString(),
          interactionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: { '@type': 'ReadAction' },
            userInteractionCount: page.totalRead,
          },
        };
        if (page.author) {
          newsSchema.author = [
            {
              '@type': 'Person',
              name: page.author.name,
              url: page.author.url || '',
            },
          ];
        }
        if (page.publisher) {
          newsSchema.publisher = [
            {
              '@type': 'Organization',
              name: page.publisher.name,
              url: page.publisher.url || '',
            },
          ];
        }
        if (page.video) {
          newsSchema.video = {
            '@type': 'VideoObject',
            name: page.video.name,
            description: page.video.description,
            thumbnailUrl: [
              defaultConfig.domainUrl +
                defaultConfig.uploadMetaImageThumbnailUrl +
                page.video.thumbnail,
              defaultConfig.domainUrl +
                defaultConfig.uploadMetaImageUrl +
                page.video.thumbnail,
            ],
            uploadDate: page.video.uploadDate.toISOString(),
            contentUrl:
              defaultConfig.domainUrl +
              defaultConfig.uploadVideoUrl +
              page.video.file,
            embedUrl: defaultConfig.domainUrl + defaultConfig.requestUrl,
            duration: page.video.duration,
            interactionStatistic: {
              '@type': 'InteractionCounter',
              interactionType: { '@type': 'WatchAction' },
              userInteractionCount: page.video.totalWatch,
            },
          };
        }
        defaultConfig.listSchema.push(newsSchema);
        defaultConfig.DEFAULT.meta_title.content = page.metaTitle;
        defaultConfig.DEFAULT.meta_description.content = page.metaDescription;
        defaultConfig.DEFAULT.meta_image = page.metaImage as any;
        page.uploadDate = moment(page.uploadDate).format(
          'HH:mm DD/MM/YYYY',
        ) as any;

        response.render(this.templateEjsPath(domain) + '/page.ejs', {
          ...defaultConfig,
          page: page,
        });
      } else {
        await this.showDomain404(domain, request, response);
      }
    } else {
      await this.showDomain404(domain, request, response);
    }
  }

  async showNewsCategory(
    refId: string,
    domain: domain & { template: template },
    request: Request,
    response: Response,
  ) {
    if (fileExistsSync(this.templateEjsPath(domain) + '/news_category.ejs')) {
      const defaultConfig = await this.getTemplateDefaultData(domain, request);
      const newsCategory = await this.prismaService.newsCategory.findUnique({
        where: {
          id: refId,
        },
        include: {
          parent: true,
        },
      });
      if (newsCategory) {
        defaultConfig.DEFAULT.meta_title.content = newsCategory.metaTitle;
        defaultConfig.DEFAULT.meta_description.content =
          newsCategory.metaDescription;
        defaultConfig.DEFAULT.meta_image = newsCategory.metaImage as any;
        const subCategory: any[] =
          await this.prismaService.newsCategory.findMany({
            where: {
              domainId: newsCategory.domainId,
              parentId: newsCategory.id,
            },
          });
        for (const subCat of subCategory) {
          subCat.news = await this.prismaService.news.findMany({
            where: {
              domainId: subCat.domainId,
              rootId: subCat.rootId,
              // right: subCat.right,
              // left: subCat.left,
              right: {
                lte: subCat.right,
              },
              left: {
                gte: subCat.left,
              },
            },
            include: {
              category: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 7,
          });
          subCat.news = subCat.news.map((newsItem) => {
            return {
              ...newsItem,
              uploadDate: moment(newsItem.uploadDate).format(
                'HH:mm DD/MM/YYYY',
              ),
            };
          });
        }
        const listNews = await this.prismaService.news.findMany({
          where: {
            domainId: newsCategory.domainId,
            rootId: newsCategory.rootId,
            // right: newsCategory.right,
            // left: newsCategory.left,
            right: {
              lte: newsCategory.right,
            },
            left: {
              gte: newsCategory.left,
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        });

        const breadcrumb = generateBreadcrumbList(newsCategory as any, domain);
        // breadcrumb.push({
        //   '@type': 'ListItem',
        //   position: breadcrumb.length + 1,
        //   name: news.title,
        // });
        const breadcrumbSchema = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumb,
        };
        defaultConfig.listSchema.push(breadcrumbSchema);

        response.render(this.templateEjsPath(domain) + '/news_category.ejs', {
          ...defaultConfig,
          newsCategory: newsCategory,
          subCategory: subCategory,
          listNews: listNews.map((newsItem) => {
            return {
              ...newsItem,
              uploadDate: moment(newsItem.uploadDate).format(
                'HH:mm DD/MM/YYYY',
              ),
            };
          }),
        });
      } else {
        await this.showDomain404(domain, request, response);
      }
    } else {
      await this.showDomain404(domain, request, response);
    }
  }

  async showNews(
    refId: string,
    domain: domain & { template: template },
    request: Request,
    response: Response,
  ) {
    if (fileExistsSync(this.templateEjsPath(domain) + '/news.ejs')) {
      const defaultConfig = await this.getTemplateDefaultData(domain, request);
      const news = await this.prismaService.news.findUnique({
        where: {
          id: refId,
        },
        include: {
          category: true,
          publisher: true,
          author: true,
          video: true,
        },
      });
      if (!news) {
        await this.showDomain404(domain, request, response);
      } else {
        const newsRelated = await this.prismaService.news.findMany({
          where: {
            domainId: news.domainId,
            rootId: news.rootId,
            // right: news.right,
            // left: news.left,
            right: {
              lte: news.right,
            },
            left: {
              gte: news.left,
            },
            createdAt: {
              lt: news.createdAt,
            },
            id: {
              not: news.id,
            },
          },
          include: {
            category: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 12,
        });
        // console.log(defaultConfig.DEFAULT);
        defaultConfig.DEFAULT.meta_title.content = news.metaTitle;
        defaultConfig.DEFAULT.meta_description.content = news.metaDescription;
        defaultConfig.DEFAULT.meta_image = news.metaImage as any;
        if (news.video) {
          defaultConfig.DEFAULT.meta_video = news.video.file as any;
        }
        const category = await this.getNewsCategoryBreadcrumb(
          news.category as any,
        );
        // console.log(category);
        //JSON.stringify(category, null, 2)
        const newsSchema: any = {
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: news.title,
          image: [
            defaultConfig.domainUrl +
              defaultConfig.uploadMetaImageThumbnailUrl +
              news.image,
            defaultConfig.domainUrl +
              defaultConfig.uploadMetaImageUrl +
              news.image,
            defaultConfig.domainUrl +
              defaultConfig.uploadMetaImageThumbnailUrl +
              news.metaImage,
            defaultConfig.domainUrl +
              defaultConfig.uploadMetaImageUrl +
              news.metaImage,
          ],
          datePublished: news.uploadDate.toISOString(),
          interactionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: { '@type': 'ReadAction' },
            userInteractionCount: news.totalRead,
          },
        };
        if (news.author) {
          newsSchema.author = [
            {
              '@type': 'Person',
              name: news.author.name,
              url: news.author.url || '',
            },
          ];
        }
        if (news.publisher) {
          newsSchema.publisher = [
            {
              '@type': 'Organization',
              name: news.publisher.name,
              url: news.publisher.url || '',
            },
          ];
        }
        if (news.video) {
          newsSchema.video = {
            '@type': 'VideoObject',
            name: news.video.name,
            description: news.video.description,
            thumbnailUrl: [
              defaultConfig.domainUrl +
                defaultConfig.uploadMetaImageThumbnailUrl +
                news.video.thumbnail,
              defaultConfig.domainUrl +
                defaultConfig.uploadMetaImageUrl +
                news.video.thumbnail,
            ],
            uploadDate: news.video.uploadDate.toISOString(),
            contentUrl:
              defaultConfig.domainUrl +
              defaultConfig.uploadVideoUrl +
              news.video.file,
            embedUrl: defaultConfig.domainUrl + defaultConfig.requestUrl,
            duration: news.video.duration,
            interactionStatistic: {
              '@type': 'InteractionCounter',
              interactionType: { '@type': 'WatchAction' },
              userInteractionCount: news.video.totalWatch,
            },
          };
        }
        defaultConfig.listSchema.push(newsSchema);
        const breadcrumb = generateBreadcrumbList(category, domain);
        breadcrumb.push({
          '@type': 'ListItem',
          position: breadcrumb.length + 1,
          name: news.title,
        });
        const breadcrumbSchema = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumb,
        };
        defaultConfig.listSchema.push(breadcrumbSchema);
        response.render(this.templateEjsPath(domain) + '/news.ejs', {
          ...defaultConfig,
          news: {
            ...news,
            category: await this.getNewsCategoryBreadcrumb(
              news.category as any,
            ),
            breadCrumb: breadcrumb,
            uploadDate: moment(news.uploadDate).format('HH:mm DD/MM/YYYY'),
            uploadDate2: moment(news.uploadDate).format(),
          },
          newsRelated: newsRelated.map((newsItem) => {
            return {
              ...newsItem,
              uploadDate: moment(newsItem.uploadDate).format(
                'HH:mm DD/MM/YYYY',
              ),
            };
          }),
        });
      }
    } else {
      await this.showDomain404(domain, request, response);
    }
  }

  async showHomePage(
    domain: domain & { template: template },
    request: Request,
    response: Response,
  ) {
    if (fileExistsSync(this.templateEjsPath(domain) + '/index.ejs')) {
      const defaultConfig = await this.getTemplateDefaultData(domain, request);
      const homeConfig = await firstValueFrom(
        this.domainTemplateService.getDomainConfig(domain, 'HOME'),
      );
      response.render(this.templateEjsPath(domain) + '/index.ejs', {
        ...defaultConfig,
        ...homeConfig,
      });
    } else {
      await this.showDomain404(domain, request, response);
    }
  }

  templateAssetsPath(domain: domain & { template: template }) {
    return '/templates/' + domain.template.code + '/';
  }

  templateEjsPath(domain: domain & { template: template }) {
    return resolve(templateFolder, domain.template.code, 'ejs');
  }

  async getTemplateDefaultData(
    domain: domain & { template: template },
    request: Request,
  ) {
    const defaultConfig = await firstValueFrom(
      this.domainTemplateService.getDomainConfig(domain, 'DEFAULT'),
    );
    return {
      DEFAULT: defaultConfig,
      domain: domain,
      domainUrl: (domain.https ? 'https://' : 'http://') + domain.domain,
      requestUrl: request.url,
      assetsDir: this.templateAssetsPath(domain),
      defaultImageTemplateDir: defaultImageTemplateDir,
      uploadMetaImageThumbnailUrl: uploadMetaImageThumbnailUrl,
      uploadMetaImageUrl: uploadMetaImageUrl,
      uploadVideoUrl: uploadVideoUrl,
      news: null,
      listSchema: [],
    };
  }

  async showDomain404(
    domain: domain & { template: template },
    request: Request,
    response: Response,
  ) {
    if (fileExistsSync(this.templateEjsPath(domain) + '/404.ejs')) {
      const defaultConfig = await this.getTemplateDefaultData(domain, request);
      response.render(this.templateEjsPath(domain) + '/404.ejs', {
        ...defaultConfig,
      });
    } else response.sendStatus(404);
  }

  checkIndex(request: Request, response: Response) {
    const url = request.originalUrl;
    const urlSplit = url.split('/');
    const indexPath = resolve(
      this.rootDir,
      './frontend/' + urlSplit[1] + '/index.html',
    );
    if (existsSync(indexPath)) {
      response.sendFile(indexPath);
    } else {
      const webAppPath = resolve(this.rootDir, './frontend/webapp/index.html');
      // console.log(webAppPath);
      if (existsSync(webAppPath)) {
        response.sendFile(webAppPath);
      } else response.sendStatus(404);
    }
  }
}
