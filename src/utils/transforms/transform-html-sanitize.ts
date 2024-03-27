import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer';
import { escape, unescape } from 'lodash';
import { load } from 'cheerio';
import get from 'axios';
import { join } from 'path';
import { ckeditorUploadDir, ckeditorUploadUrl } from '../find-root-dir';
import { writeFileSync } from 'fs';
import { utimes } from 'fs/promises';
export const TransformHtmlSanitize = async (
  value: string,
  newModifiedTime: Date,
) => {
  // console.trace('TransformHtmlSanitize');
  // return Transform(async ({ value }) => {
  const $ = load(value);
  const imgTags = $('img');

  for (let i = 0; i < imgTags.length; i++) {
    const img = $(imgTags[i]);
    const src = img.attr('src');
    try {
      // console.log(src);
      const url = new URL(src);
      // console.log(url);
      if (url.hostname) {
        const response = await get(src, {
          responseType: 'arraybuffer',
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537',
            Accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, sdch',
            'Accept-Language': 'en-US,en;q=0.8',
            'Upgrade-Insecure-Requests': '1',
          },
        });
        let str = url.pathname;
        str = str.startsWith('/') ? str.slice(1) : str; // Loại bỏ dấu gạch chéo đầu tiên nếu có
        const filename = str.replace(/\//g, '-');
        // const filename = basename(url.pathname);
        // const parsedPath = parse(filename);
        // const randomStr = RandStr(6).toUpperCase();
        // parsedPath.name += '-' + randomStr; // Thêm chuỗi ngẫu nhiên vào tên file
        // console.log('parsedPath', parsedPath);
        // const newFilename = format(parsedPath); // Tạo lại tên file với chuỗi ngẫu nhiên đã thêm vào
        const newFilePath = join(
          ckeditorUploadDir,
          filename,
          // parsedPath.name + parsedPath.ext,
        );
        console.log(newFilePath);
        writeFileSync(newFilePath, response.data);

        await utimes(newFilePath, newModifiedTime, newModifiedTime);
        img.attr('src', ckeditorUploadUrl + filename);
      }
    } catch (error) {
      console.error(`Failed to download or save image: ${error}`);
    }
  }
  // console.trace('TransformHtmlSanitize', value);
  // console.log($.html());
  return sanitizeHtml($.html(), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'video',
      'source',
      'img',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      video: ['controls', 'width', 'height'],
      source: ['src', 'type'],
      img: ['src', 'style', 'width', 'height', 'title', 'alt', 'class'],
    },
  });
  // });
};

export const AllowScriptTags = () => {
  return Transform(({ value }) => {
    return sanitizeHtml(value, {
      allowedTags: ['script'],
      allowedAttributes: {
        script: [
          'src',
          'type',
          'async',
          'defer',
          'crossorigin',
          'integrity',
          'charset',
        ],
      },
    });
  });
};
export const removeHtmlTags = () => {
  return Transform(({ value }) => {
    // console.trace('removeHtmlTags', value);
    // return escape(value);
    return sanitizeHtml(value, {
      allowedTags: [],
      allowedAttributes: {},
    });
  });
};

/**
 * Vì Transform sẽ được gọi 02 lần, lần đầu tiên sẽ nhận giá trị từ client, lần thứ 2 sẽ nhận giá trị từ server
 * Nên cần phải unescape giá trị trước khi escape giá trị
 */
export const escapeHtml = () => {
  return Transform(({ value }) => {
    return escape(unescape(value));
  });
};
