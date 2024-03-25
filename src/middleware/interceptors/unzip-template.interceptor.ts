import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { from, Observable, switchMap } from 'rxjs';
import { RandStr } from '../../utils/rand-str';
import * as decompress from 'decompress';
import { templateAssetsDir, templateFolder } from '../../constants';
import { dirname, join } from 'path';
import { mkdir, rename } from 'fs/promises';
import { unlinkSync } from 'fs';

@Injectable()
export class UnzipTemplateInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const code = RandStr(6).toUpperCase();
    request.body.code = code;
    const templateDir = join(templateFolder, code);
    const codeDir = join(templateAssetsDir, code);
    request.removeDir = [templateDir, codeDir];
    if (request.file.path) {
      return from(decompress(request.file.path, templateDir)).pipe(
        switchMap(async (files) => {
          for (const file of files) {
            // console.log(file);
            if (!(file.path.includes('ejs/') && file.path.endsWith('.ejs'))) {
              try {
                const newFilePath = join(codeDir, file.path);
                await mkdir(dirname(newFilePath), { recursive: true });
                await rename(join(templateDir, file.path), newFilePath);
              } catch (e) {
                console.log(e);
              }
            }
          }
          try {
            unlinkSync(request.file.path);
          } catch (e) {}
          request.file = code;
        }),
        switchMap(() => next.handle()),
      );
    } else {
      throw new Error('File not found');
    }
  }
}
