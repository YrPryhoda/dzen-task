import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { FindCommentsOptions } from './../../entities/comment/comment.interface';
import { CreateCommentDto } from './../../dto/comment/create.comment.dto';
import { CommentService } from '../../entities/comment/comment.service';
import { UploadService } from '../../entities/upload/upload.service';
import { UserService } from '../../entities/user/user.service';
import {
  commentCreateJob,
  commentGetAllJob,
  commentGetOneJob,
  commentQueue,
} from './comment.constants';

@Processor(commentQueue)
export class CommentConsumer {
  constructor(
    private commentService: CommentService,
    private uploadService: UploadService,
    private userService: UserService,
  ) {}

  @Process(commentCreateJob)
  async createCommentJob(
    job: Job<{ comment: CreateCommentDto; file: Express.Multer.File }>,
  ) {
    const { comment, file } = job.data;
    const user = await this.userService.findOrCreate({
      email: comment.email,
      userName: comment.userName,
    });

    const baseComment = {
      text: comment.text,
      user,
      upload: null,
      parent: null,
    };

    if (file) {
      const savedImage = await this.uploadService.save(
        file.originalname,
        file.mimetype,
      );
      baseComment.upload = savedImage;
    }

    if (comment.parent) {
      const parent = await this.commentService.findOne(comment.parent);

      if (parent) {
        baseComment.parent = parent;
      }
    }

    return await this.commentService.createComment(baseComment);
  }

  @Process(commentGetOneJob)
  async findCommentJob(job: Job<{ id: number }>) {
    const { id } = job.data;
    const comment = await this.commentService.findOne(id);

    if (!comment) {
      throw Error('Not found');
    }

    const commentTree = await this.commentService.findTree(comment);

    if (!commentTree) {
      throw Error('Tree not found');
    }

    return commentTree;
  }

  @Process(commentGetAllJob)
  async findCommentsJob(job: Job<FindCommentsOptions>) {
    return await this.commentService.getRootComments(job.data);
  }
}
