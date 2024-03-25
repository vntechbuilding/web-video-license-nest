import { join } from 'path';
import {
  uploadMetaImageDir,
  uploadMetaImageThumbnailDir,
} from './find-root-dir';
import { unlinkSync } from 'fs';

export const Delete16x9Image = (deleteData: {
  image: string;
  metaImage: string;
}) => {
  const imagePath = join(uploadMetaImageDir, deleteData.image);
  const imageThumbnailPath = join(
    uploadMetaImageThumbnailDir,
    deleteData.image,
  );
  const metaImagePath = join(uploadMetaImageDir, deleteData.metaImage);
  const metaImageThumbnailPath = join(
    uploadMetaImageThumbnailDir,
    deleteData.metaImage,
  );
  try {
    unlinkSync(imagePath);
    unlinkSync(imageThumbnailPath);
  } catch (e) {}
  try {
    unlinkSync(metaImagePath);
    unlinkSync(metaImageThumbnailPath);
  } catch (e) {}
};
