import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer';
export const TransformHtmlSanitize = () => {
  return Transform(({ value }) => {
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
export const removeHtmlTags = () => {
  return Transform(({ value }) => {
    return sanitizeHtml(value, {
      allowedTags: [],
      allowedAttributes: {},
    });
  });
};
