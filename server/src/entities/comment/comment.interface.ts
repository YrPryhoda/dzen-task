import { UserInterface } from '../user/user.interface';
import { BaseInterface } from '../base/base.interface';
import { UploadInterface } from '../upload/upload.interface';

interface CommentBodyInterface {
  text: string;
  parent: null | CommentInterface;
}
export interface CommentInterface extends BaseInterface, CommentBodyInterface {
  user: UserInterface;
  upload: null | UploadInterface;
  replies?: CommentInterface[];
}

export interface CreateCommentInterface extends CommentBodyInterface {
  user: UserInterface;
  upload?: UploadInterface;
}

export interface FindCommentsOptions {
  sortField?: string;
  direction?: string;
  skip: number;
  take: number;
}
