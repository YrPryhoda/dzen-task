import { Module } from '@nestjs/common';
import { CommentApiModule } from './comment/comment.module';
import { UploadApiModule } from './upload/upload.module';
@Module({
  imports: [CommentApiModule, UploadApiModule],
})
export class ApiModule {}
