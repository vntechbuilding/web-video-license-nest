import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { useContainer } from 'class-validator';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NotFoundExceptionFilter } from './middleware/filter';
import { PrismaService } from './middleware/prisma/prisma.service';
import { DomainTemplateService } from './middleware/services/domain-template/domain-template.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.use(compression());
  app.use(bodyParser.json({ limit: '1gb' }));
  app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      validateCustomDecorators: true,
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const rs = [];
        for (const k in validationErrors) {
          rs.push({
            property: validationErrors[k].property,
            value: validationErrors[k].value,
            errors: validationErrors[k].constraints,
            code: Object.keys(validationErrors[k].constraints)[0],
            message:
              validationErrors[k].constraints[
                Object.keys(validationErrors[k].constraints)[0]
              ],
          });
        }
        return new BadRequestException(rs);
      },
    }),
  );
  const prismaService = app.get(PrismaService);
  const domainTemplateService = app.get(DomainTemplateService);
  app.useGlobalFilters(
    new NotFoundExceptionFilter(prismaService, domainTemplateService),
  );
  await app.listen(process.env.SERVER_PORT);
  console.log('Server started at port', process.env.SERVER_PORT);
}
bootstrap().then();
