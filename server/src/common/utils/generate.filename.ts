import { v4 } from 'uuid';

export const buildFilename = (file: Express.Multer.File) => {
  const fileData = file.originalname.split('.');
  const name = fileData[0];
  const fileExtName = fileData[fileData.length - 1];
  const randomName = v4();
  return `${name}-${randomName}.${fileExtName}`;
};
