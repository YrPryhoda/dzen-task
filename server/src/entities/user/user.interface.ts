import { CommentInterface } from '../comment/comment.interface';
import { BaseInterface } from '../base/base.interface';

export interface UserInterface extends BaseInterface {
  userName: string;
  email: string;
  comments?: CommentInterface[];
}
