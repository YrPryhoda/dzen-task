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
  Query,
} from '@nestjs/common';

import { CommentProducerService } from '../../queue/comment/comment.producer.service';
import { SortDirectionValidationPipe } from '../../common/pipes/sort.direction.pipe';
import { FindCommentsOptions } from '../../entities/comment/comment.interface';
import { SortFieldValidationPipe } from '../../common/pipes/sort.field.pipe';
import { ResponseCommentDto } from '../../dto/comment/response.comment.dto';
import { CreateCommentDto } from '../../dto/comment/create.comment.dto';
import { SharpPipe } from '../../common/pipes/sharp.pipe';
import { WsService } from '../../modules/ws/ws.service';

const ITEMS_PER_PAGE = 25;

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentProducerService: CommentProducerService,
    private readonly wsService: WsService,
  ) {}

  @Get('/')
  async getRootComments(
    @Query('sortField', SortFieldValidationPipe) sortField: string,
    @Query('direction', SortDirectionValidationPipe) direction: string,
    @Query('skip') skip = 1,
  ) {
    try {
      const options: FindCommentsOptions = { skip, take: ITEMS_PER_PAGE };
      if (sortField) {
        options.sortField = sortField;
      }

      if (direction) {
        options.direction = direction;
      }

      const rootTrees = await this.commentProducerService.findComments(options);

      return {
        comments: rootTrees.comments.map((el) => new ResponseCommentDto(el)),
        count: rootTrees.count,
      };
    } catch (err) {
      const error = err as Error;
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':commentId')
  async findComment(@Param('commentId', ParseIntPipe) commentId: number) {
    try {
      const commentTree = await this.commentProducerService.findComment(
        commentId,
      );
      return new ResponseCommentDto(commentTree);
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
      const createdComment = await this.commentProducerService.createComment(
        data,
        file,
      );

      const commentDto = new ResponseCommentDto(createdComment);
      this.wsService.newCommentCreated(commentDto);
      return commentDto;
    } catch (err: unknown) {
      const error = err as Error;
      throw new BadRequestException(error.message);
    }
  }
}
