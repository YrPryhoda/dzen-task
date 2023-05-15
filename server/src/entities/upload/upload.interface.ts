import { BaseInterface } from './../base/base.interface';
import { CommentInterface } from '../comment/comment.interface';

export interface UploadInterface extends BaseInterface {
  path: string;
  mimeType: string;
  comment: CommentInterface;
}
