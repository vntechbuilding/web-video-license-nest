import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { templateType, domain, templateData } from '@prisma/client';
import { from, Observable, of, switchMap, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Prisma } from '.prisma/client';
import { BuildMenuTree } from '../../../utils/build-menu-tree';
export declare type domainTemplateConfigItem = templateData & {
  refId: string;
  content: any;
  listData?: Array<any>;
};
export declare type domainTemplateConfigType = {
  [code: string]: domainTemplateConfigItem;
} | null;
export declare type domainTemplateConfig = {
  [key in templateType]: domainTemplateConfigType;
};
@Injectable()
export class DomainTemplateService {
  constructor(private prisma: PrismaService) {
    // console.log('DomainTemplateService');
    // from(this.prisma.domain.findFirst())
    //   .pipe(
    //     switchMap((domain) =>
    //       this.getDomainConfig(domain, templateType.DEFAULT),
    //     ),
    //   )
    //   .subscribe((configData) => {
    //     console.log(configData);
    //   });
  }

  getAllDomainConfig(
    domainId: string,
  ): Observable<domainTemplateConfig | null> {
    return from(
      this.prisma.domain.findUnique({
        where: {
          id: domainId,
        },
      }),
    ).pipe(
      switchMap((domain) => {
        if (domain) {
          return zip(
            this.getDomainConfig(domain, templateType.DEFAULT),
            this.getDomainConfig(domain, templateType.HOME),
            this.getDomainConfig(domain, templateType.NEWS),
            this.getDomainConfig(domain, templateType.PAGE),
            this.getDomainConfig(domain, templateType.ARTICLE),
          ).pipe(
            map(
              ([
                defaultConfig,
                homeConfig,
                newsConfig,
                pageConfig,
                articleConfig,
              ]) => {
                return {
                  [templateType.DEFAULT]: defaultConfig,
                  [templateType.HOME]: homeConfig,
                  [templateType.NEWS]: newsConfig,
                  [templateType.PAGE]: pageConfig,
                  [templateType.ARTICLE]: articleConfig,
                };
              },
            ),
          );
        } else {
          return of(null);
        }
      }),
    );
  }

  getDomainConfig(
    domain: domain,
    templateType: templateType,
  ): Observable<domainTemplateConfigType> {
    return zip(
      from(
        this.prisma.templateData.findMany({
          where: {
            templateId: domain.templateId,
            templateType: templateType,
          },
          orderBy: {
            sortOrder: 'asc',
          },
        }),
      ),
      from(
        this.prisma.domainTemplate.findMany({
          where: {
            domainId: domain.id,
            templateType: templateType,
          },
        }),
      ),
    )
      .pipe(
        map(([templateData, domainConfig]) => {
          if (!templateData || !templateData.length) {
            return null;
          }

          // Map refId and content of domainTemplate into templateData
          const mappedTemplateData = templateData.map((data) => {
            const correspondingDomainConfig = domainConfig.find(
              (config) => config.code === data.code,
            );
            return {
              ...data,
              refId: correspondingDomainConfig?.refId,
              content: correspondingDomainConfig?.content,
            };
          });

          // Convert templateData from Array to Object with key as templateData.code
          return mappedTemplateData.reduce((acc, curr) => {
            acc[curr.code] = curr;
            return acc;
          }, {});
        }),
      )
      .pipe(
        switchMap((config) => {
          if (config && Object.keys(config).length > 0) {
            const listTransactions: Prisma.PrismaPromise<any>[] = [];
            const listRefId: { [refId: string]: domainTemplateConfigItem } = {};
            for (const code in config) {
              const configItem = config[code];
              if (configItem.refId) {
                if (configItem.dataType === 'NEWS') {
                  listRefId[configItem.refId] = configItem;
                  listTransactions.push(
                    this.prisma.news.findUnique({
                      where: {
                        id: configItem.refId,
                      },
                    }),
                  );
                } else if (configItem.dataType === 'NEWS_CATEGORY') {
                  listRefId[configItem.refId] = configItem;
                  listTransactions.push(
                    this.prisma.newsCategory.findUnique({
                      where: {
                        id: configItem.refId,
                      },
                    }),
                  );
                } else if (configItem.dataType === 'MENU') {
                  listRefId[configItem.refId] = configItem;
                  listTransactions.push(
                    this.prisma.menu.findUnique({
                      where: {
                        id: configItem.refId,
                      },
                    }),
                  );
                } else if (configItem.dataType === 'PAGE') {
                  listRefId[configItem.refId] = configItem;
                  listTransactions.push(
                    this.prisma.page.findUnique({
                      where: {
                        id: configItem.refId,
                      },
                    }),
                  );
                }
              }
            }
            if (listTransactions && listTransactions.length > 0) {
              return from(this.prisma.$transaction(listTransactions)).pipe(
                map((listTransactionsResult) => {
                  for (const result of listTransactionsResult) {
                    if (listRefId[result.id]) {
                      //TODO tìm kiếm tin tức đối với NEWS_CATEGORY
                      //Tìm kiếm các menu con
                      if (config[listRefId[result.id].code])
                        config[listRefId[result.id].code].content = result;
                      // listRefId[result.id].content = result;
                    }
                  }
                  return config;
                }),
              );
            } else {
              return of(config);
            }
          } else {
            return of(config);
          }
        }),
      )
      .pipe(
        switchMap((config: domainTemplateConfigType) => {
          if (config) {
            return new Promise<domainTemplateConfigType>((resolve) => {
              (async () => {
                const configKeys = Object.keys(config);
                for (const key of configKeys) {
                  const configData = config[key];
                  if (
                    configData.dataType === 'NEWS_CATEGORY' &&
                    configData.content.id &&
                    typeof configData.config === 'object' &&
                    typeof configData.config['take'] === 'number' &&
                    configData.config['take'] > 0
                  ) {
                    configData.listData = await this.prisma.news.findMany({
                      take: configData.config['take'],
                      orderBy: {
                        createdAt: 'desc',
                      },
                      include: {
                        author: true,
                        video: true,
                        publisher: true,
                      },
                      where: {
                        domainId: configData.content.domainId,
                        rootId: configData.content.rootId,
                        right: {
                          lte: configData.content.right,
                        },
                        left: {
                          gte: configData.content.left,
                        },
                      },
                    });
                  } else if (
                    configData.dataType === 'MENU' &&
                    configData.content.id
                  ) {
                    const domainMenu = await this.prisma.menu.findMany({
                      where: {
                        domainId: configData.content.domainId,
                      },
                    });
                    // console.log(domainMenu);
                    configData.listData = BuildMenuTree(
                      domainMenu,
                      configData.refId,
                    );
                  }
                }
                resolve(config);
              })();
            });
          }
          return of(config);
        }),
      );
  }

  // getListMenu(newsCategory: domainTemplateConfigItem) {}
}
