import { ResponseBaseDto } from '../base/response.base.dto';
import { UploadEntity } from './../../entities/upload/upload.entity';

export class ResponseUploadDto extends ResponseBaseDto<UploadEntity> {
  readonly path: string;
  readonly mimeType: string;

  constructor(upload: UploadEntity) {
    super(upload);
    this.path = upload.path;
    this.mimeType = upload.mimeType;
  }
}
