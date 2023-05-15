import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';

@Module({
  controllers: [UploadController],
  imports: [],
  providers: [],
})
export class UploadApiModule {}
