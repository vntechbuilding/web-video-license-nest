import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { from, map, Observable } from 'rxjs';
export declare type ModelNameType = keyof typeof Prisma.ModelName;
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

  findManyAndCount<T extends ModelNameType>(
    model: T,
    params?: {
      take?: number;
      skip?: number;
    },
    where?: {},
  ): Observable<{ data: [any]; count: number }> {
    const modelInstance = this[model] as any;
    return from(
      this.$transaction([
        modelInstance.findMany({ ...params, where: { ...where } }),
        modelInstance.count({ where: { ...where } }),
      ]),
    ).pipe(map(([data, count]) => ({ data, count })));
  }
}
