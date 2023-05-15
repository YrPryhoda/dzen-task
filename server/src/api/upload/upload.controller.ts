import { createReadStream } from 'fs';
import { access } from 'fs/promises';
import { join } from 'path';
import {
  Controller,
  Get,
  Param,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';

@Controller('upload')
export class UploadController {
  @Get(':imgPath')
  async getUploadedfile(
    @Param('imgPath') imgPath: string,
  ): Promise<StreamableFile> {
    try {
      const repository = join(process.cwd(), 'files');
      const filePath = join(repository, imgPath);

      await access(filePath);
      const fileStream = createReadStream(join(repository, imgPath));

      fileStream.on('error', (error) => {
        console.log(error.message);
      });

      return new StreamableFile(fileStream);
    } catch (err: unknown) {
      const error = err as Error;
      console.log(err);
      throw new NotFoundException(error.message);
    }
  }
}
