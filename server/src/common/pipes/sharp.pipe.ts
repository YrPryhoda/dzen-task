import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { pipeline } from 'stream/promises';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';

import { buildFilename } from '../utils/generate.filename';
import { FileManager } from '../utils/file.manager';

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<Express.Multer.File>>
{
  async transform(file: Express.Multer.File): Promise<Express.Multer.File> {
    if (!file) {
      return null;
    }

    const fileInfo = path.parse(file.originalname);
    const MAX_TXT_SIZE = 1024 * 100;
    const MAX_IMG_WIDHT = 320;
    const MAX_IMG_HEIGHT = 240;
    const errorMsg = 'Only image or txt files allowed!';

    if (!fileInfo.ext.match(/\.(jpg|jpeg|png|gif|txt)$/)) {
      throw new BadRequestException(errorMsg);
    }

    const uploadedFilename = buildFilename(file);
    const baseDir = path.join('.', 'files');
    const dest = path.join(baseDir, uploadedFilename);
    await FileManager.getDirAccess(baseDir);

    if (fileInfo.ext === '.txt') {
      if (file.size > MAX_TXT_SIZE) {
        throw new BadRequestException('Txt file is too large');
      }
      await pipeline(file.buffer.toString(), fs.createWriteStream(dest));
    } else {
      try {
        const currentImage = sharp(file.buffer);
        const imageMetadata = await currentImage.metadata();

        if (
          imageMetadata.width > MAX_IMG_WIDHT ||
          imageMetadata.height > MAX_IMG_HEIGHT
        ) {
          currentImage.resize(MAX_IMG_WIDHT, MAX_IMG_HEIGHT);
        }

        await currentImage.toFile(dest);
      } catch (error) {
        throw new BadRequestException(errorMsg);
      }
    }

    return { ...file, originalname: uploadedFilename };
  }
}
