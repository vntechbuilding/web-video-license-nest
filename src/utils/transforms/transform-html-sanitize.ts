import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer';
import { escape, unescape } from 'lodash';
export const TransformHtmlSanitize = () => {
  // console.trace('TransformHtmlSanitize');
  return Transform(({ value }) => {
    // console.trace('TransformHtmlSanitize', value);
    return sanitizeHtml(value, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        'video',
        'source',
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        video: ['controls', 'width', 'height'],
        source: ['src', 'type'],
      },
    });
  });
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
