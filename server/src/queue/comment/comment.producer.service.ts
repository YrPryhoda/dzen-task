import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import { FindCommentsOptions } from './../../entities/comment/comment.interface';
import { CreateCommentDto } from './../../dto/comment/create.comment.dto';
import { CommentEntity } from './../../entities/comment/comment.entity';
import {
  commentCreateJob,
  commentGetAllJob,
  commentGetOneJob,
  commentQueue,
} from './comment.constants';

@Injectable()
export class CommentProducerService {
  constructor(@InjectQueue(commentQueue) private queue: Queue) {}

  async createComment(
    comment: CreateCommentDto,
    file: Express.Multer.File,
  ): Promise<CommentEntity> {
    const job = await this.queue.add(commentCreateJob, {
      comment,
      file,
    });

    return await job.finished();
  }

  async findComments(
    options: FindCommentsOptions,
  ): Promise<{ comments: CommentEntity[]; count: number }> {
    const job = await this.queue.add(commentGetAllJob, options);

    return await job.finished();
  }

  async findComment(id: number): Promise<CommentEntity> {
    const job = await this.queue.add(commentGetOneJob, {
      id,
    });

    return await job.finished();
  }
}
