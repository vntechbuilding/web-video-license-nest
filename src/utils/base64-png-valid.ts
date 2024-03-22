import { fromBuffer } from 'file-type';

export const Base64PngValid = async (
  image: string,
): Promise<{ isValid: boolean; buffer?: Buffer }> => {
  if (!image) return { isValid: false };

  // Kiểm tra tiền tố
  if (!image.startsWith('data:image/png;base64,')) return { isValid: false };

  // Loại bỏ tiền tố
  const base64Data = image.replace('data:image/png;base64,', '');

  // Chuyển đổi base64 thành Buffer
  const buffer = Buffer.from(base64Data, 'base64');
  // Kiểm tra loại hình ảnh
  const type = await fromBuffer(buffer);
  // Kiểm tra xem có phải là PNG hay không
  const isValid = type && type.ext === 'png' && type.mime === 'image/png';
  return { isValid, buffer };
};
