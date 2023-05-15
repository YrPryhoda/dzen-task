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
} from '@nestjs/common';

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
  @UseInterceptors()
  async createComment(@Body() data: any) {
    try {
      return data;
    } catch (err: unknown) {
      const error = err as Error;
      throw new BadRequestException(error.message);
    }
  }
}
