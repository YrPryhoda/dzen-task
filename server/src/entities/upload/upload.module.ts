import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { uploadProvider } from './upload.provider';

@Module({
  imports: [],
  providers: [...uploadProvider, UploadService],
  exports: [UploadService],
})
export class UploadEntityModule {}
