import { BaseInterface } from "./base.interfaces";
import { UploadInterface } from "./upload.interfaces";
import { UserInterface } from "./user.interfaces";

export interface CommentInterface extends BaseInterface {
  text: string;
  parent?: null | CommentInterface;
  user: UserInterface;
  upload?: null | UploadInterface;
  replies: CommentInterface[];
}

export interface CommentSortOptions {
  sortField: string;
  direction: string;
  skip: number;
}

export interface CreateCommentInterface {
  text: string;
  parent?: number;
  userName: string;
  email: string;
  file?: File;
}
