import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UPLOAD_REPOSITORY } from '../../modules/database/database.constants';
import { UploadEntity } from './upload.entity';

@Injectable()
export class UploadService {
  constructor(
    @Inject(UPLOAD_REPOSITORY)
    private uploadRepository: Repository<UploadEntity>,
  ) {}

  async save(path: string, mimeType: string) {
    return this.uploadRepository.save({
      path,
      mimeType,
    });
  }
}
