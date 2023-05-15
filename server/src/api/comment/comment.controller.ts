import { FileInterceptor } from '@nestjs/platform-express';
import {
  Body,
  Controller,
  Get,
  Post,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { CreateCommentDto } from '../../dto/comment/create.comment.dto';
import { SharpPipe } from '../../common/pipes/sharp.pipe';

@Controller('comment')
export class CommentController {
  @Get('/')
  async getRootComments() {
    try {
      return [];
    } catch (err) {
      const error = err as Error;
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':commentId')
  async findComment(@Param('commentId', ParseIntPipe) commentId: number) {
    try {
      return { commentId };
    } catch (err) {
      const error = err as Error;
      throw new NotFoundException(error.message);
    }
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors()
  async createComment(
    @Body() data: CreateCommentDto,
    @UploadedFile(SharpPipe) file: Express.Multer.File,
  ) {
    try {
      const createdComment = {
        data,
        file,
      };

      return createdComment;
    } catch (err: unknown) {
      const error = err as Error;
      throw new BadRequestException(error.message);
    }
  }
}
