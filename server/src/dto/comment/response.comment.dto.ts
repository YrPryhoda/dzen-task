import { CommentEntity } from './../../entities/comment/comment.entity';
import { ResponseUploadDto } from './../upload/response.upload.dto';
import { ResponseBaseDto } from './../base/response.base.dto';
import { ResponseUserDto } from '../user/response.user.dto';

export class ResponseCommentDto extends ResponseBaseDto<CommentEntity> {
  readonly id: number;
  readonly text: string;
  readonly upload: null | ResponseUploadDto = null;
  readonly parent: null | ResponseCommentDto = null;
  readonly replies: ResponseCommentDto[] | [] = [];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly user: ResponseUserDto;

  constructor(comment: CommentEntity) {
    super(comment);
    this.text = comment.text;
    this.user = new ResponseUserDto(comment.user);

    if (comment.upload) {
      this.upload = new ResponseUploadDto(comment.upload);
    }

    if (comment.parent) {
      this.parent = new ResponseCommentDto(comment.parent);
    }

    if (comment.replies && comment.replies.length) {
      this.replies = comment.replies.map((el) => new ResponseCommentDto(el));
    }
  }
}
