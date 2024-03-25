import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, urlType } from '@prisma/client';
import { catchError, from, map, Observable, of, switchMap, zip } from 'rxjs';
import { ToSlug } from '../../utils/to-slug';
import { RandStr } from '../../utils/rand-str';
export declare type ModelNameType = keyof typeof Prisma.ModelName;
type WhereInput<T extends ModelNameType> = T extends 'page'
  ? Prisma.pageWhereInput
  : T extends 'user'
    ? Prisma.userWhereInput
    : T extends 'admin'
      ? Prisma.adminWhereInput
      : T extends 'domain'
        ? Prisma.domainWhereInput
        : T extends 'author'
          ? Prisma.authorWhereInput
          : T extends 'publisher'
            ? Prisma.publisherWhereInput
            : T extends 'news'
              ? Prisma.newsWhereInput
              : T extends 'newsCategory'
                ? Prisma.newsCategoryWhereInput
                : T extends 'video'
                  ? Prisma.videoWhereInput
                  : T extends 'page'
                    ? Prisma.pageWhereInput
                    : never;
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    console.log('New Prisma Service', process.env.DATABASE_URL);
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      // debug: true,
      // log: ['query', 'info', 'warn', 'error'],
    });
  }
  async onModuleInit(): Promise<void> {
    await this.$connect();
    console.log('PrismaService onModuleInit success');
    // this.$on('query', async (e) => {
    //   console.log(`${e.query} ${e.params}`);
    // });
  }

  deleteUrl(data: { domainId: string; refId: string }) {
    return this.url.deleteMany({
      where: {
        domainId: data.domainId,
        refId: data.refId,
      },
    });
  }

  updateUrl<T extends ModelNameType>(model: T, id: string, type: urlType) {
    const modelInstance = this[model] as any;
    return from(
      modelInstance.findUnique({
        where: {
          id: id,
        },
      }),
    ).pipe(
      switchMap((modelData: any) => {
        const slug = ToSlug(modelData.title);
        if ((modelData.url || '').indexOf(slug) === 0) {
          return of(modelData);
        } else {
          return zip(
            this.url.findUnique({
              where: {
                domainId_url: {
                  domainId: modelData.domainId,
                  url: slug,
                },
              },
            }),
            this.url.deleteMany({
              where: {
                domainId: modelData.domainId,
                refId: modelData.url || '',
              },
            }),
          ).pipe(
            switchMap(([urlSearch]) => {
              // console.log(urlSearch);
              if (urlSearch) {
                const slugWithId = slug + '-' + RandStr(4).toLowerCase();

                return zip(
                  modelInstance.update({
                    where: {
                      id: id,
                    },
                    data: {
                      url: slugWithId,
                    },
                  }),
                  this.url.create({
                    data: {
                      domainId: modelData.domainId,
                      url: slugWithId,
                      type: type,
                      refId: id,
                    },
                  }),
                );
              } else {
                return zip(
                  modelInstance.update({
                    where: {
                      id: id,
                    },
                    data: {
                      url: slug,
                    },
                  }),
                  this.url.create({
                    data: {
                      domainId: modelData.domainId,
                      url: slug,
                      type: type,
                      refId: id,
                    },
                  }),
                );
              }
            }),
          );
        }
      }),
      catchError((err) => {
        console.log('updateUrl error', err);
        return of(null);
      }),
    );
  }

  findManyAndCount<T extends ModelNameType>(
    model: T,
    params: {
      [key: string]: any;
    } = {},
    where?: WhereInput<T>,
  ): Observable<{ data: [any]; count: number }> {
    const modelInstance = this[model] as any;
    return from(
      this.$transaction([
        modelInstance.findMany({ ...params, where: { ...where } }),
        modelInstance.count({ where: { ...where } }),
      ]),
    ).pipe(map(([data, count]) => ({ data, count })));
  }

  defaultManyAndCountResult = { data: [], count: 0 };
}
