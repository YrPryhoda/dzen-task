import { Controller, Get, Param, NotFoundException } from '@nestjs/common';

@Controller('upload')
export class UploadController {
  @Get(':imgPath')
  async getUploadedfile(@Param('imgPath') imgPath: string): Promise<string> {
    try {
      return imgPath;
    } catch (err: unknown) {
      const error = err as Error;
      console.log(err);
      throw new NotFoundException(error.message);
    }
  }
}
