import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Request } from 'express';
@Catch(NotFoundException)
export class NotFoundExceptionFilter<T> implements ExceptionFilter {
  constructor(private rootDir: string) {
    console.log(rootDir);
  }
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();
    const url = request.originalUrl;
    const urlSplit = url.split('/');
    const response = ctx.getResponse();
    const indexPath = path.resolve(
      this.rootDir,
      './frontend/' + urlSplit[1] + '/index.html',
    );
    if (fs.existsSync(indexPath)) {
      response.sendFile(indexPath);
    } else {
      const webAppPath = path.resolve(
        this.rootDir,
        './frontend/webapp/index.html',
      );
      // console.log(webAppPath);
      if (fs.existsSync(webAppPath)) {
        response.sendFile(webAppPath);
      } else response.sendStatus(404);
    }
  }
}
