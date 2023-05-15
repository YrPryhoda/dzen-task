import { BaseInterface } from "./base.interfaces";

export interface UploadInterface extends BaseInterface {
  path: string;
  mimeType: string;
}
